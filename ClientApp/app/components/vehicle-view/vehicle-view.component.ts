import { AuthService } from './../../services/auth.service';
import { BrowserXhr } from '@angular/http';
import { NgZone } from '@angular/core';
import { ProgressService, BrowserXhrWithProgress } from './../../services/progress.service';
import { PhotoService } from './../../services/photo.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
    templateUrl: 'vehicle-view.component.html',
    providers: [
        { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
        ProgressService
    ]
})

export class VehicleViewComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;
    vehicle: any;
    vehicleId: number;
    photos: any[];
    progress: any;

    constructor(
        private zone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private toasty: ToastyService,
        private progressService: ProgressService,
        private photoService: PhotoService,
        private vehicleService: VehicleService,
        private authService: AuthService
    ) {
        route.params.subscribe(p => {
            this.vehicleId = +p['id'];
            if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
                router.navigate(['/vehicles']);
                return;
            }
        });
    }

    ngOnInit() {
        this.photoService.getPhotos(this.vehicleId)
            .subscribe(photos => this.photos = photos);

        this.vehicleService.getVehicle(this.vehicleId)
            .subscribe(
            v => this.vehicle = v,
            err => {
                if (err.status == 404) {
                    this.router.navigate(['/vehicles']);
                    return;
                }
            });
    }

    delete() {
        if (confirm("Are you sure?")) {
            this.vehicleService.delete(this.vehicle.id)
                .subscribe(x => {
                    this.router.navigate(['/vehicles']);
                });
        }
    }

    uploadPhoto() {
        this.progressService.startTracking()
            .subscribe(progress => {
                this.zone.run(() => {
                    this.progress = progress;
                });
            },
            null,
            () => { this.progress = null; });

        var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        var file = nativeElement.files[0];
        nativeElement.value = '';
        this.photoService.upload(this.vehicleId, file)
            .subscribe(photo => {
                this.photos.push(photo);
            },
            err => {
                this.toasty.error({
                    title: 'Error',
                    msg: err.text(),
                    theme: 'bootstrap',
                    showClose: true,
                    timeout: 5000
                });
            });
    }
}
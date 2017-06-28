import { ProgressService } from './../../services/progress.service';
import { PhotoService } from './../../services/photo.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
    templateUrl: 'vehicle-view.component.html'
})

export class VehicleViewComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;
    vehicle: any;
    vehicleId: number;
    photos: any[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private toasty: ToastyService,
        private progressService: ProgressService,
        private photoService: PhotoService,
        private vehicleService: VehicleService
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
        var nativeElement: HTMLInputElement = this.fileInput.nativeElement;

        this.progressService.uploadProgress
            .subscribe(progress => console.log(progress));

        this.photoService.upload(this.vehicleId, nativeElement.files[0])
            .subscribe(photo => {
                this.photos.push(photo);
            });
    }
}
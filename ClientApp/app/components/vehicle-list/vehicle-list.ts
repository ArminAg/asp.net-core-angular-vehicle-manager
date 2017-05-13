import { VehicleService } from './../../services/vehicle.service';
import { Vehicle } from './../../models/vehicle';
import { OnInit, Component } from '@angular/core';

@Component({
    templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[];

    constructor(private vehicleService: VehicleService) { }

    ngOnInit() {
        this.vehicleService.getVehicles()
            .subscribe(vehicles => this.vehicles = vehicles);
    }
}
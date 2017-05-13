import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { OnInit, Component } from '@angular/core';

@Component({
    templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent implements OnInit {
    queryResult: any = {};
    makes: KeyValuePair[];
    query: any = {
        pageSize: 3
    };
    columns = [
        { title: 'Id' },
        { title: 'Contact Name', key: 'contactName', isSortable: true },
        { title: 'Make', key: 'make', isSortable: true },
        { title: 'Model', key: 'model', isSortable: true },
        { }
    ];

    constructor(private vehicleService: VehicleService) { }

    ngOnInit() {
        this.vehicleService.getMakes()
            .subscribe(makes => this.makes = makes);
        this.populateVehicles();
    }

    private populateVehicles() {
        this.vehicleService.getVehicles(this.query)
            .subscribe(result => this.queryResult = result);
    }

    onFilterChange() {
        // Temporary filtering test for model
        this.query.modelId = 2;
        this.populateVehicles();
    }

    resetFilter() {
        this.query = {};
        this.onFilterChange();
    }

    sortBy(columnName) {
        if (this.query.sortBy === columnName) {
            this.query.isSortAscending = !this.query.isSortAscending;
        } else {
            this.query.sortBy = columnName;
            this.query.isSortAscending = true;
        }
        this.populateVehicles();
    }

    onPageChanged(page) {
        this.query.page = page;
        this.populateVehicles();
    }
}
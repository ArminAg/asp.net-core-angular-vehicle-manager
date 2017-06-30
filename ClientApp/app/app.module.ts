import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth.guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { AuthService } from './services/auth.service';
import * as Raven from 'raven-js';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { BrowserXhr } from '@angular/http';
import { PhotoService } from './services/photo.service';
import { VehicleViewComponent } from './components/vehicle-view/vehicle-view.component';
import { PaginationComponent } from './components/shared/pagination.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { ErrorHandler } from '@angular/core';
import { AppErrorHandler } from './app.error-handler';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { ToastyModule } from 'ng2-toasty';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';

import { VehicleService } from './services/vehicle.service';
import { AUTH_PROVIDERS } from "angular2-jwt/angular2-jwt";

Raven.config('https://591ae1bfe4d8476fa774bf7dc4228711@sentry.io/185274').install();

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        VehicleViewComponent,
        PaginationComponent,
        AdminComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        ToastyModule.forRoot(),
        ChartModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [AuthGuard] },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [AuthGuard] },
            { path: 'vehicles/:id', component: VehicleViewComponent },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard] },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
        AuthService,
        VehicleService,
        PhotoService,
        AuthGuard,
        AdminAuthGuard,
        AUTH_PROVIDERS
    ]
})
export class AppModule {
}

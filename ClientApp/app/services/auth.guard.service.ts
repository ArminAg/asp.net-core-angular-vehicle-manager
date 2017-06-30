import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(protected authService: AuthService) { }

    canActivate() {
        if (this.authService.isAuthenticated())
            return true;

        window.location.href = 'https://vehiclemanager.eu.auth0.com/login?client=LpuGTpXge5GZwRduXXOxJ8xcXRERSR7x';
        return false;
    }
}
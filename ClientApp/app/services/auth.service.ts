import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
    userProfile: any;
    private roles: string[] = [];

    auth0 = new auth0.WebAuth({
        clientID: 'LpuGTpXge5GZwRduXXOxJ8xcXRERSR7x',
        domain: 'vehiclemanager.eu.auth0.com',
        responseType: 'token',
        audience: 'https://vehiclemanager.eu.auth0.com/userinfo',
        redirectUri: 'http://localhost:5000/vehicles',
        scope: 'openid profile'
    });

    constructor(public router: Router) { 
        this.readUserProfileFromLocalStorage();
        this.readRolesFromLocalStorage();
    }

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((error, authResult) => {
            if (authResult && authResult.accessToken) {
                window.location.hash = '';
                this.setSession(authResult);
                this.setUserProfile();
                this.readRolesFromLocalStorage();
            } else if (error) {
                console.log(error);
            }
        });
    }

    private readUserProfileFromLocalStorage() {
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
    }

    private readRolesFromLocalStorage() {
        var token = localStorage.getItem('token');
        if (token) {
            var jwtHelper = new JwtHelper();
            var decodedToken = jwtHelper.decodeToken(token);
            this.roles = decodedToken['https://vehiclemanager.com/roles'];
        }
    }

    private setUserProfile(): void {
        const accessToken = localStorage.getItem('token');
        if (!accessToken)
            throw new Error('Access token must exist to fetch profile');

        this.auth0.client.userInfo(accessToken, (error, userProfile) => {
            if (error)
                throw error;

            if (userProfile) {
                localStorage.setItem('profile', JSON.stringify(userProfile));
            }
        });
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('token', authResult.accessToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('profile');
        this.userProfile = null;
        this.roles = [];
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    public isInRole(roleName) {
        return this.roles.indexOf(roleName) > -1;
    }
}
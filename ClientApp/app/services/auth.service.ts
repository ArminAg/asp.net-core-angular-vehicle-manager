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

    constructor(public router: Router) { }

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        var token = localStorage.getItem('access_token');
        if (token) {
            var jwtHelper = new JwtHelper();
            var decodedToken = jwtHelper.decodeToken(token);
            this.roles = decodedToken['https://vehiclemanager.com/roles'];
        }
        this.auth0.parseHash((error, authResult) => {
            if (authResult && authResult.accessToken) {
                window.location.hash = '';
                this.setSession(authResult);

                var jwtHelper = new JwtHelper();
                var decodedToken = jwtHelper.decodeToken(authResult.accessToken);
                this.roles = decodedToken['https://vehiclemanager.com/roles'];

                this.getProfile();
            } else if (error) {
                console.log(error);
            }
        });
    }

    public getProfile(): void {
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
        if (this.userProfile)
            return this.userProfile;

        const accessToken = localStorage.getItem('access_token');
        if (!accessToken)
            throw new Error('Access token must exist to fetch profile');

        this.auth0.client.userInfo(accessToken, (error, userProfile) => {
            if (error)
                throw error;

            if (userProfile) {
                this.userProfile = userProfile;
                localStorage.setItem('profile', JSON.stringify(userProfile));
            }
        });
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
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
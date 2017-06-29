import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    profile: any;

    constructor (private authService: AuthService) {
        
    }
}

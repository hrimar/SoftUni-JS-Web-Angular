import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
      
    constructor(private router : Router, private authService : AuthService) {}

    // canActivate(route: import("@angular/router").ActivatedRouteSnapshot, 
    //     state: import("@angular/router").RouterStateSnapshot): boolean 
    //     | import("@angular/router").UrlTree | import("rxjs").Observable<boolean 
    //     | import("@angular/router").UrlTree> | Promise<boolean 
    //     | import("@angular/router").UrlTree> {
    //     if(this.authService.checkIfLogged()){
    //             return true;
    //         } else {
    //             // this.router.navigateByUrl('/login');
    //             this.router.navigate(['/login']);
    //             return false;
    //         }
    // }

    canActivate() {
        if(this.authService.checkIfLogged()){
            return true;
        } else {
            this.router.navigateByUrl('/login');;
            return false;
        }
    }
}
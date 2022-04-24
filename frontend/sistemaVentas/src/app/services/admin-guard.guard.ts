import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './auth.service.service';
import { JwtHelperService } from "@auth0/angular-jwt"

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router:Router) { }

  canActivate(){
    if(this.authService.isSuperUser()) return true;

      this.router.navigate(['/home'])
      console.log('resultado:  ', this.authService.isSuperUser())
      return false
    
  }
}

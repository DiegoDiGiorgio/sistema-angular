import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './auth.service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router:Router) { }

  canActivate(){
    if(this.authService.isLoggedIn()) return true;

      this.router.navigate([''])
      console.log('resultado:  ', this.authService.isLoggedIn())
      return false
    
  }
}

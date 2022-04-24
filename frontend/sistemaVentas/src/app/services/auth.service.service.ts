import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt"
import { Router } from '@angular/router';
import { UserServiceService } from './user-service.service'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  url = "http://127.0.0.1:8000/api/token/";
  currentUser:any;
  constructor(private http:HttpClient, private router:Router, private user: UserServiceService) {}

  getToken(json){
    return this.http.post(this.url, json).pipe(
      map(response =>{
        let result = response;
        if(result){
          localStorage.setItem('token', result["access"])
          this.router.navigate(['/home'])
          localStorage.setItem('user_id', (new JwtHelperService().decodeToken(result["access"]).user_id))
           this.setCurrentUser()
          return true;
        }
        return false;
      })
    )
  }

  setCurrentUser(){
    this.user.getUser(localStorage.getItem('user_id')).subscribe(data=>{
      this.currentUser=data
   })
  }

  getCurrentUser(){
    return this.currentUser
  }

  logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    this.router.navigate([''])
  }

  isLoggedIn(){
    let token = localStorage.getItem('token')
    if(! new JwtHelperService().isTokenExpired(token)) return true;
      return false
  }
  
  isSuperUser(){
    return this.currentUser.is_superuser
  }
}

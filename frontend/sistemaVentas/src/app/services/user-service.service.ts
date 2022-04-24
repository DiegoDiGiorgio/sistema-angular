import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url = 'http://127.0.0.1:8000/users/'
  
  constructor(private http:HttpClient) { }
   
  getUsers(){
    return this.http.get(this.url)
  }
  getUser(id){
    return this.http.get(this.url + id)
  }
  postUser(json){
    return this.http.post(this.url, json)
  }
}

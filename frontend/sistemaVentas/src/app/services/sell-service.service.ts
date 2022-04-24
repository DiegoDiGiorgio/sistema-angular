import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellServiceService {
  url = "http://127.0.0.1:8000/sells/";

  constructor( private http:HttpClient) { }

  getSells(){
    return this.http.get(this.url)
  }
  getSell(id){
    return this.http.get(this.url + id)
  }
  postSell(json){
    let head = new HttpHeaders();
    head.append('Content-Type','application/json')
    return this.http.post(this.url, json,{headers:head})
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  url = "http://127.0.0.1:8000/products/";

  constructor(private http:HttpClient) { }

  getProducts(){

    return this.http.get(this.url)
  }
  getProduct(id){

    return this.http.get(this.url + id)
  }
  postProduct(json){
   return this.http.post(this.url,json)
  }
  putProduct(json, id){
    return this.http.put(this.url+id+'/',json)
  }

}
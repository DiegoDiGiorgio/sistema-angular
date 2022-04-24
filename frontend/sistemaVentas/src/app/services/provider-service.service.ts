import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderServiceService {
  url = 'http://127.0.0.1:8000/providers/';
  
  constructor(private http:HttpClient) { }
 
  getProviders(){
    return this.http.get(this.url)
  }
  
  getProvider(id){
    return this.http.get(this.url+id+'/')
  }

  postProvider(json){
    return this.http.post(this.url,json)
  }

  putProvider(json,id){
    return this.http.put(this.url+id+'/',json)
  }
}

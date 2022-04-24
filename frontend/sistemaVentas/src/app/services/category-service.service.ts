import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  constructor(private http:HttpClient) { }
  url = 'http://127.0.0.1:8000/categories/';

  getCategories(){
    return this.http.get(this.url)
  }
  postCategory(json){
    return this.http.post(this.url,json)
  }
  deleteCategory(id){
    return this.http.delete(this.url+id)
  }

  
}

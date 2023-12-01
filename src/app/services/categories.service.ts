import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  //load all the categories
  public categories()
  {
    return this.http.get(`${baseurl}/category/`);  
  }

  //add new categories
  public addCategory(category: any)
  {
    return this.http.post(`${baseurl}/category/`,category);
  }
}

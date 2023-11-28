import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //current user details : which is logged in
  public getCurrentUser()
  {
    return this.http.get(`${baseurl}/current-user`);
  }

  // generate tokens
  public generateTokens(loginData:any){

    return this.http.post(`${baseurl}/generate-token`,loginData);    
  }

  // login user: set token in localStorage
  public loginUser(token: string)
  {
    localStorage.setItem("token",token);
    return true;
  }

  //check user is login or not
  public isLoggedIn()
  {
    let tokenStr=localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null)
    {
      return false;
    }
    else{
      return true;
    }
  }

  //logout : remove token from local storage
  public logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token from the localStorage
  public getToken()
  {
    return localStorage.getItem("token");
  }
  
  //set user details
  public setUser(user: any)
  {
    localStorage.setItem("user", JSON.stringify(user));
  }

  //get user 
  public getUser()
  {
    let userStr=localStorage.getItem("user");

    if(userStr!=null)
    {
      return JSON.parse(userStr);
    }
    else
    {
      this.logout();
      return null;
    }
  }

  //get user roles
  public getUserRole()
  {
    let user=this.getUser()
    return user.authorities[0].authority;
  }

  
}

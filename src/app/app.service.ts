import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl = "https://app.mlab.co.za/users/";

  constructor(private http: HttpClient) { }

  getSigninUser(username: string, password: string) {
    return this.http.post(this.apiUrl + "login", { username: username, password: password });
  }

  getUser(userId: string) {
    return this.http.get(this.apiUrl + userId);
  }

  userSession(user: any){
    return localStorage.setItem("user",JSON.stringify(user));
  }

getUserSession(){
  return JSON.parse(localStorage.getItem("user"));
}

logout(){
  this.http.post(this.apiUrl + "logout",{})
  return localStorage.removeItem("user");

}

}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class UserService{
  username;
  constructor(private http:HttpClient){
    this.username='shreeramk';
  }
  getUser(){
    return this.http.get("https://api.github.com/users/"+this.username)
  }
}

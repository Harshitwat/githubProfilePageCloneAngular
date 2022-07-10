import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from "rxjs/operators";
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gitClone';
  user:any;
  constructor(private http:HttpClient, private userService:UserService){}
  ngOnInit(): void {
    this.userService.getUser().subscribe(data=>{
      this.user=data;
    })
  }
}

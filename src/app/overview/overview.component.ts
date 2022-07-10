import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { min } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  user:any;
  repo:any[]=[];
  constructor(private http:HttpClient,private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(data=>{
      this.user=data;
      this.http.get(this.user.repos_url).subscribe(repo=>{
      (<any[]>repo).sort((n1,n2)=>{
        if(n1.stargazers_count>n2.stargazers_count)
        return 1;
        else if(n1.stargazers_count==n2.stargazers_count){
          if(n1.watchers_count>n2.watchers_count)
            return 1;
          else if(n1.watchers_count==n2.watchers_count){
            if(n1.created_at>n2.created_at)
              return 1;
            else
              return -1;
          }
          else
            return -1;
        }
        else
          return -1;
      })
      for (let i = 0; i < Math.min((<any[]>repo).length,6); i++) {
        if((<any[]>repo)[i].private===false){
          this.repo.push((<any[]>repo)[i]);
        }

      }


      })
    })
  }

}


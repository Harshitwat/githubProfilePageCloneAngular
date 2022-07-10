import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import {ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

declare var Plotly: any;
@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {
  data:any;
  totalContributions:number;
  year:any[]=[];
  @ViewChild("Graph", { static: true })
  private Graph: ElementRef;
  constructor(private http:HttpClient,private userService:UserService) { }

  ngOnInit(): void {
    const headers = {
      'Authorization': `bearer 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`,
    }
    const body = {
      "query": `query {
        user(login: "${this.userService.username}") {
          name
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  color
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }`
    }

    this.http.post('https://api.github.com/graphql',body,{headers:headers}).subscribe(yeardata=>{
      this.data=yeardata;
      this.totalContributions=this.data.data.user.contributionsCollection.contributionCalendar.totalContributions;
      this.year=this.data.data.user.contributionsCollection.contributionCalendar.weeks;
      console.log(this.year);
      let xValues = [];
      for(let i=0;i<52;i++) {
        xValues.push(i);
      }

      const yValues = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].reverse();

      let zValues = [
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ];

      let zNumbers = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ];
      for (let i = 0; i < this.year.length; i++) {
        const contributionWeek = this.year[i].contributionDays;
        for (let j = contributionWeek.length-1; j >=0 ; j--) {
          zValues[j].push(contributionWeek[j]);
          zNumbers[j].push(contributionWeek[j].contributionCount);
        }
      }

      var data = [{
        y: yValues,
        z: zNumbers,
        type: 'heatmap',
        colorscale: 'Greens',
        hoverongaps: false,
        hoverinfo: 'none',
        reversescale: true,
        showscale: false,
      }];

      var layout = {
        title: this.totalContributions+' Contributions in the last year',
        annotations: [],
        xaxis: {
          ticks: '',
        },
        yaxis: {
          ticks: 'outside',
          ticksuffix: ' ',
        },
        width: 700,
        height: 250,
      };

      for ( var i = 0; i < yValues.length; i++ ) {
        for ( var j = 0; j < xValues.length; j++ ) {
          var result = {
            xref: 'x1',
            yref: 'y1',
            x: xValues[j],
            y: yValues[i],
            hovertext: `${zValues[i][j].contributionCount} contributions on ${zValues[i][j].date}`,
            text:'',
            font: {
              family: 'Arial',
              size: 12,
              color: 'rgb(50, 171, 96)'
            },
            showarrow: false,
          };
          layout.annotations.push(result);
        }
      }

      Plotly.newPlot('myDiv', data, layout);


    })


  }


}

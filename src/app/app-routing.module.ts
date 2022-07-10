import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { PackageComponent } from './package/package.component';
import { ProjectsComponent } from './projects/projects.component';
import { RepoComponent } from './repo/repo.component';
import {APP_BASE_HREF} from '@angular/common';


const routes: Routes = [
  {path:'',component:OverviewComponent},
  {path:'repositories',component:RepoComponent},
  {path:'projects',component:ProjectsComponent},
  {path:'packages',component:PackageComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppRoutingModule { }

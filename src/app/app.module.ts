import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { RepoComponent } from './repo/repo.component';
import { ProjectsComponent } from './projects/projects.component';
import { PackageComponent } from './package/package.component';
import { AppRoutingModule } from './app-routing.module';
import { HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
import { HeatmapComponent } from './heatmap/heatmap.component';


@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    RepoComponent,
    ProjectsComponent,
    PackageComponent,
    HeatmapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HeatMapModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import {FormsModule} from '@angular/forms'
import {RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { ProjectTasksComponent } from './components/project-tasks/project-tasks.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ProjectPlaceholderComponent } from './components/project-placeholder/project-placeholder.component';
import { ProjectTasksItemComponent } from './components/project-tasks-item/project-tasks-item.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ConfigComponent } from './components/config/config.component';
import { InfoComponent } from './components/info/info.component';
import { ProjectCategoryListComponent } from './components/project-category-list/project-category-list.component';


const appRoutes: Routes = [
  {path: '', component: ProjectPlaceholderComponent},
  {path: 'project', component: ProjectPlaceholderComponent},
  {path: 'project/:id', component: ProjectTasksComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'config', component: ConfigComponent},
  {path: 'info', component: InfoComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProjectsComponent,
    ProjectItemComponent,
    ProjectTasksComponent,
    NewProjectComponent,
    AddTaskComponent,
    ProjectPlaceholderComponent,
    ProjectTasksItemComponent,
    StatisticsComponent,
    CalendarComponent,
    ConfigComponent,
    InfoComponent,
    ProjectCategoryListComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

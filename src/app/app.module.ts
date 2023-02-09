import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import {FormsModule} from '@angular/forms'
import {ActivatedRoute, RouterModule, Routes, Router } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FullCalendarModule } from '@fullcalendar/angular';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import { NotifierModule } from 'angular-notifier';
import { MatDividerModule } from '@angular/material/divider';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

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
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { NgChartsModule } from 'ng2-charts';


const appRoutes: Routes = [
  {path: '', component: ProjectPlaceholderComponent, canActivate: [AuthGuard]},
  {path: 'project', component: ProjectPlaceholderComponent, canActivate: [AuthGuard]},
  {path: 'project/:id', component: ProjectTasksComponent, canActivate: [AuthGuard]},
  {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},
  {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
  {path: 'config', component: ConfigComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'info', component: InfoComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent}
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
    EditProjectComponent,
    EditTaskComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgChartsModule,
    FullCalendarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    CommonModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { 
  
}

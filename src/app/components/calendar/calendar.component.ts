import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { ProjectService } from 'src/app/service/project.service';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class CalendarComponent implements OnInit {
  faCalendar = faCalendarDays
  loading = true
  faSync = faSync
  events: any = []
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.events,
    eventClick: this.handleDateClick.bind(this)
  };
  // title = 'title'

  constructor(private projectService: ProjectService, private router: Router) { 
    // console.log('constructor')
    // console.log(router)
   }

   handleDateClick(event: any) {
    console.log(event.event._def.groupId)
    // console.log(this.router)
    this.router.navigate(['/project/', event.event._def.groupId])
    // this.projectService.getProjects().subscribe(project => console.log(project))
  }

  // testFunc(){
  //   console.log('debug')
  //   console.log(this.router)
  // }

  ngOnInit(): void {

    this.projectService.getProjects().subscribe(projects => {
      
      projects.map(project => {
        if(project.tasks) {
          project.tasks.map(task => {
            if(task.status) {
              let color;
              if (project.category === 'Software') {
                color = '#0BBF35'
              }
              if (project.category === 'Marketing') {
                color = '#20C0F7'
              }
              if (project.category === 'Administration') {
                color = '#F4C222'
              }
              if (project.category === 'Design') {
                color = '#0BBF35'
              }
              this.events.push({groupId: project.id, title: task.title, date: task.date, color: color})
            }
          })
        }
      })
      
      console.log('Tasks calendar')
      console.log(projects)
      console.log(this.events)
      this.loading = false
      

    })
  }

  

}

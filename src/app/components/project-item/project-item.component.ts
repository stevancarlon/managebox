import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons'
import { Project } from 'src/app/Project';
import { ProjectService } from 'src/app/service/project.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})

export class ProjectItemComponent implements OnInit {
  faEllipsisV = faEllipsisV
  @Input() project!: Project
  @Input() category!: any
  @Input() projects!: Project[]

  constructor(private router: Router, private projectService: ProjectService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.projectService.getProjects().subscribe((projects: Project[]) => {
    //   this.projects = projects
    // })
    console.log(this.projects)
  }

  ngOnChanges() {
    console.log('change...')
  }
  
  openProject(id: any) {
    this.router.navigateByUrl(`/project/${id}`);
  }

  getTextColor(category: string) {
    switch(category){
      case 'Software':
        return '#0BBF35'
      case 'Marketing':
        return '#20C0F7'
      case 'Administration':
        return '#ebbc00'
      default:
        return '#d5d0bd'
    }
  }

  getColor(category: string) {
    switch (category) {
      case 'Software':
        return '#193E2D;';
      case 'Marketing':
        return '#237692';
      case 'Administration':
        return '#91770c';
      // add more cases as needed
      default:
        return '#0BBF35';
    }
  }

  getBorder(category: string): string {
    switch (category) {
      case 'Software':
        return '1px solid #0BBF35';
      case 'Marketing':
        return '1px solid #20C0F7';
      case 'Administration':
        return '1px solid #F4C222';
      // add more cases as needed
      default:
        return '1px solid #0BBF35';
    }
  }

  getLeftBorder(category: string): string {
    switch (category) {
      case 'Software':
        return '4px solid #0BBF35';
      case 'Marketing':
        return '4px solid #20C0F7';
      case 'Administration':
        return '4px solid #F4C222';
      // add more cases as needed
      default:
        return '4px solid #0BBF35';
    }
  }

}

import { Component, Input, OnInit, Output } from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import { Subject } from 'rxjs';
import { Project } from 'src/app/Project';
import { ProjectService } from 'src/app/service/project.service';
import { UiService } from 'src/app/service/ui.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  faSearch = faSearch
  @Output() projects: Project[] = []
  @Input() category!: string
  @Output() project!: any

  constructor(private projectService: ProjectService, private uiService:UiService, private cd: ChangeDetectorRef) {}

  private subject = new Subject<any>();
  public observable = this.subject.asObservable();


  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects
    })
  }
  
  toggleForm() {
    this.uiService.toggleAddProject()
  }

  addProject(project: Project) {
    this.projectService.addProject(project).subscribe((task) => (this.projects.push(project)))
    console.log('add project')
    
    console.log(this.projects)
    this.cd.detectChanges();
  }

}

import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Project } from 'src/app/Project';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-project-category-list',
  templateUrl: './project-category-list.component.html',
  styleUrls: ['./project-category-list.component.css']
  
})
export class ProjectCategoryListComponent implements OnInit{
  @Input() projects: Project[] = []
  categories_list: any[] = []
  @Output() updateProjects = new EventEmitter<any>();
  @Input() project!: any;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects
      this.projects.map((project) => {
        if (!this.categories_list.includes(project.category)) {
          this.categories_list.push(project.category)
        }
      })
    })
    this.projects.map((project) => {
      if (!this.categories_list.includes(project.category)) {
        this.categories_list.push(project.category)
      }
    })
  }

  updateCategoryList(project: any) {
    this.updateProjects.emit(project)
  }

}

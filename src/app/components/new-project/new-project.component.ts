import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/Project';
import { ProjectService } from 'src/app/service/project.service';
import { UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  @Output() onAddProject: EventEmitter<Project> = new EventEmitter();
  title!: string;
  date!: string;
  description!: string;
  members!: string[];
  category!: string;
  showAddProject!: boolean;
  subscription!: Subscription;
  projects: Project[] = []

  constructor(private projectService: ProjectService, private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddProject = value));
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects
    })
  }

  toggleForm() {
    this.uiService.toggleAddProject();
  }

  onSubmit() {

    let maxId = 0;

    for (let project of this.projects) {
      maxId = Math.max(maxId, project.id)
    }

    const nextId = maxId + 1


    const newProject = {
      id: nextId,
      title: this.title,
      description: this.description,
      date: this.date,
      members: this.members,
      status: true,
      category: this.category
    }

    this.onAddProject.emit(newProject)

    this.title = ''
    this.description = ''
    this.date = ''
    this.members = []

  }

}

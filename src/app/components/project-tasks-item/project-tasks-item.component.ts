import { Component, Input } from '@angular/core';
import {faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/Project';

@Component({
  selector: 'app-project-tasks-item',
  templateUrl: './project-tasks-item.component.html',
  styleUrls: ['./project-tasks-item.component.css']
})
export class ProjectTasksItemComponent {
  faEllipsisV = faEllipsisV
  faClock = faClock
  faPaperclip = faPaperclip

  @Input() task!: any

}

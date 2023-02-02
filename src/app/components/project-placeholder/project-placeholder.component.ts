import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-project-placeholder',
  templateUrl: './project-placeholder.component.html',
  styleUrls: ['./project-placeholder.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ProjectPlaceholderComponent {

}

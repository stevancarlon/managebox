import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { UiService } from 'src/app/service/ui.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


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
export class ProjectPlaceholderComponent implements OnInit {

  url!: any

  constructor(private uiService: UiService, private route: ActivatedRoute, private router: Router) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        // console.log(this.url)
        if(this.url === '/') {
          setTimeout(() => this.uiService.openShowMenu(), 1000)
          setTimeout(() => this.uiService.openShowProjectList(), 1000)
        }
      }
    });

    
    
    
  }

  ngOnInit(): void {
    
  }

  

}

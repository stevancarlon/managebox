import { Component, OnInit,  OnDestroy } from '@angular/core';
import { ViewChild, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './service/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,  OnDestroy {
  @ViewChild('routerOutlet', { static: true }) routerOutlet: any;
  route!: any;

  constructor(private changeDetectorRef: ChangeDetectorRef, private router: Router, public userService: UserService) { 
    
  }


  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.route = event.url;
      }
      // console.log(this.route)
    })
  }

  ngOnDestroy() {
    
  }

  updateView() {
    this.changeDetectorRef.detectChanges();
    // console.log('lol')
  }
}

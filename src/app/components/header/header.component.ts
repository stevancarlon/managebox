import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  UrlSegment,
} from '@angular/router';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import {
  faBarChart,
  faListCheck,
  faGear,
  faInfoCircle,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/service/user.service';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { UiService } from 'src/app/service/ui.service';
import { Subscription } from 'rxjs';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { HostListener } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
    trigger('slide', [
      state('up', style({ transform: 'translateY(-100%)' })),
      state('down', style({ transform: 'translateY(0)' })),
      transition('up => down', animate('300ms ease-in')),
      transition('down => up', animate('300ms ease-out')),
    ]),
    trigger('slide2', [
      state('left', style({ transform: 'translateX(-100%)' })),
      state('right', style({ transform: 'translateX(0)' })),
      transition('left => right', animate('300ms ease-in')),
      transition('right => left', animate('300ms ease-out')),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faBars = faBars;
  faCalendarDays = faCalendarDays;
  faBarChart = faBarChart;
  faListCheck = faListCheck;
  faGear = faGear;
  faInfoCircle = faInfoCircle;
  faEllipsisH = faEllipsisH;
  showMoreDropbox: boolean = false;
  showMenu!: boolean;
  subscription!: Subscription;
  screenHeight!: number;
  screenWidth!: number;
  currentRoute!: any;
  url!: string;
  // routeSubscription: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private uiService: UiService,
    public route: ActivatedRoute,
  ) {
    // console.log('header')
    this.subscription = this.uiService
      .onToggleShowMenu()
      .subscribe((value) => (this.showMenu = value));
    this.getScreenSize();
    if (this.screenWidth > 770) {
      this.showMenu = true;
    }
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        // console.log(this.url)
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    const dropdown = document.querySelector('.more-dropbox');
    const button = document.querySelector('.menu-info');
    const option = document.querySelector('.more-dropbox-item');
    
    if (!dropdown?.contains(event.target) && !button?.contains(event.target)) {

      this.showMoreDropbox = false
      
    }
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }

  alternateMenu() {
    if (this.screenWidth <= 770) {
      this.uiService.toggleShowMenu();
    }
  }

  alternateProjectList() {
    if (this.screenWidth <= 770) {
      this.uiService.toggleShowProjectList();
    }
  }

  closeProjectList() {
    if (this.screenWidth <= 770) {
      this.uiService.closeShowProjectList();
    }
  }
}

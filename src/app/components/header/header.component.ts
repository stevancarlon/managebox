import { Component } from '@angular/core';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { faBarChart, faListCheck, faGear, faInfoCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  faCalendarDays = faCalendarDays
  faBarChart = faBarChart
  faListCheck = faListCheck
  faGear = faGear
  faInfoCircle = faInfoCircle
}

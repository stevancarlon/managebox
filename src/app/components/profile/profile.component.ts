import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ProfileComponent {
  username!: any
  faUser = faUser
  user!: any

  constructor(private userService: UserService) {
    this.username = localStorage.getItem('username')
    this.userService.getUsers().subscribe(users => {
      users.map(user => {
        if (user.username === this.username) {
          this.user = user
        }
      })
    })

    // // console.log(this.username)
  }


}

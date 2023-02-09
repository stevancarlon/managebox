import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { UiService } from 'src/app/service/ui.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LoginPageComponent {
  faGithub = faGithub
  faLinkedin = faLinkedin
  username!: string
  password!: string
  loggedIn: boolean = false
  isLoading: boolean = false

  constructor(private userService: UserService, private router: Router, private uiService: UiService, private toastr: ToastrService) {
    this.userService.loginStatus().subscribe(status => {
      if(status) {
        this.router.navigate([''])
      }
      
    })
  }

  login() {
    this.isLoading = true
    // console.log('login')
    this.userService.getUsers().subscribe(users => {
      this.loggedIn = false
      
      users.map(user => {
        if (user.username === this.username && user.password === this.password) {
          this.loggedIn = true
        } 
      })

      if(this.loggedIn) {
        console.log('User logged in successfully.')
        this.toastr.success('You have logged in successfully.', 'Success!');
        this.userService.login(this.username)
        this.router.navigate([''])
        this.isLoading = false
      } else {
        console.log('Failed to login.')
        this.toastr.error('Incorrect user or password.', 'Error!');
        this.isLoading = false
      }
    })
  }

}

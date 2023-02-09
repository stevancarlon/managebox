import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  animations: [
    trigger('slide', [
      state(
        'all',
        style({
          transform: 'translateX(0%)',
        })
      ),
      state(
        'in-progress',
        style({
          transform: 'translateX(200%)',
        })
      ),
      state(
        'delivered',
        style({
          transform: 'translateX(460%)',
        })
      ),
      transition('* => *', animate('200ms ease-in')),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class RegisterPageComponent {

  faGithub = faGithub
  faLinkedin = faLinkedin
  username!: string
  password!: string
  confirmPass!: string
  isLoading = false

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService){
    this.userService.loginStatus().subscribe(status => {
      if(status) {
        this.router.navigate(['']);
      }
      
    })
  }

  navigateTo(page: any) {
    this.router.navigate([page])
  }

  register() {
    this.isLoading = true
    if (this.password != this.confirmPass ){
      console.log('Passwords are not identical.')
      this.toastr.error('Passwords are not identical.', 'Error!');
      this.isLoading = false
      return
    }
    if (!this.username || this.username.length < 6) {
      console.log('Username must have 6 or more characters.')
      this.toastr.error('Username must have 6 or more characters.', 'Error!');
      this.isLoading = false
      return
    }

    const user = {
      username: this.username,
      password: this.password
    }

    this.userService.registerUser(user).subscribe(result => {
      console.log('User registered.')
      this.toastr.success('Your account was created.', 'Success!');
      this.isLoading = false
      this.userService.login(this.username)
      this.router.navigate([''])
    })
  }

}

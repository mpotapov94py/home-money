import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(private usersService: UsersService,
              private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      'email' : new FormControl(null,[Validators.required, Validators.email]),
      'password': new FormControl(null,[Validators.required, Validators.minLength(5)]),
      'name': new FormControl(null,[Validators.required]),
      'agree': new FormControl(false,[Validators.requiredTrue])
    })
  }

  protected onSubmit(): void {
    const { email, password, name } = this.form.value;
    const user = new User(email, password, name);
    this.usersService.createNewUser(user)
    .subscribe(() => {
      console.log(user);
      this.router.navigate(['/login'], {
        queryParams: {
          nowCanLogin: true
        }
      });
    })
    
  }

  // private forbiddenEmails(control: FormControl): Promise<any> {
  //   , this.forbiddenEmails.bind(this)
  //   console.log(control.value)
  //   return new Promise( (resolve, reject) => {
  //     this.usersService.getUserByEmail(control.value)
  //         .subscribe((user: User) => {
  //             if (user) {
  //               resolve({forbiddenEmails: true})
  //             } else {
  //                  resolve(null);
  //               }
  //         })
  //   })
  // }
}

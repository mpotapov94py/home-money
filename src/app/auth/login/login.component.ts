import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  protected message: Message 
  
  constructor(private usersService: UsersService, 
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.message = new Message('danger', '');
    this.activatedRoute.queryParams
        .subscribe((params: Params) => {
          if (params['nowCanLogin']) {
            this.showMessage({type:'success', text: 'Теперь вы можете войти в систему'});
          }
        });
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
  }

  protected onSubmit(): void {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
                     .subscribe( (user: User) => {
                        if (user) {
                          if (user.password === this.form.value.password) {
                            this.authService.login();
                            window.localStorage.setItem('user', JSON.stringify(user));
                            this.message.text = '';
                            this.router.navigate(['/system', 'bill']);
                          } else {
                            this.showMessage({type:'danger', text:'Не верный пароль!'});
                          }
                        } else {
                          this.showMessage({type:'danger', text:'Вы не зарегестрированы!'});
                        }
                     });
  }

  public showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000)
  }
}

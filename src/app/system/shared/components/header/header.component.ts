import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  protected date: Date = new Date();
  protected user: User;

  constructor(private authService: AuthService,
              private router: Router
  ) {}

  public ngOnInit(): void {
    this.user = JSON.parse(window.localStorage.getItem('user')) || '';
  }

  protected onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

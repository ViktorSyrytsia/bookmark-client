import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$?: Observable<boolean>;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.authenticated$;
  }

  onLogout(): void {
    this.authService.logout();
  }
}

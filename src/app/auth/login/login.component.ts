import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserInput } from 'src/generated-types';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {}

  onSubmit(createUserData: CreateUserInput) {
    this.loginService
      .login(createUserData)
      .subscribe(() => this.router.navigate(['/']));
  }
}

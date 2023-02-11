import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CreateUserGQL, CreateUserInput } from 'src/generated-types';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(
    private readonly createUserGql: CreateUserGQL,
    private readonly router: Router,
    private readonly loginService: LoginService
  ) {}

  onSubmit(createUserData: CreateUserInput): void {
    this.createUserGql
      .mutate({ createUserData })
      .pipe(switchMap(() => this.loginService.login(createUserData)))
      .subscribe(() => this.router.navigate(['/']));
  }
}

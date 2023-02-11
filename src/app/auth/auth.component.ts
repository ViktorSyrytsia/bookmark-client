import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateUserInput } from "src/generated-types";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  @Output() onSubmitEvent = new EventEmitter<CreateUserInput>();
  @Input() submitLabel: string = 'Submit';

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';

  private subscriptions$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    this.initFormWatcher();
  }

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value.';
    }
    return this.email.hasError('email') ? 'Not a valid email' : 'Unknown error';
  }

  getPasswordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'You must enter a value.';
    }
    return 'Unknown error';
  }

  onSubmit(): void {
    if (this.email.value && this.password.value) {
      this.onSubmitEvent.emit({
        email: this.email.value,
        password: this.password.value,
      });
    }
  }

  private initFormWatcher(): void {
    this.email.statusChanges
      .pipe(takeUntil(this.subscriptions$))
      .subscribe(() => {
        this.emailErrorMessage = this.getEmailErrorMessage();
      });

    this.password.statusChanges
      .pipe(takeUntil(this.subscriptions$))
      .subscribe(() => {
        this.passwordErrorMessage = this.getPasswordErrorMessage();
      });
  }

  ngOnDestroy(): void {
      this.subscriptions$.next();
      this.subscriptions$.complete();
  }
}

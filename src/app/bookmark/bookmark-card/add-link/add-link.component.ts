import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss'],
})
export class AddLinkComponent implements OnInit, OnDestroy {
  private readonly MIN_LENGTH = 5;
  private readonly MAX_LENGTH = 250;

  linkErrorMessage: string = '';

  link = new FormControl('', [
    Validators.required,
    Validators.minLength(this.MIN_LENGTH),
    Validators.maxLength(this.MAX_LENGTH),
  ]);

  private subscriptions$ = new Subject<void>();

  constructor(private readonly dialogRef: MatDialogRef<AddLinkComponent>) {}

  ngOnInit(): void {
    this.initFormWatcher();
  }

  addLink() {
    this.dialogRef.close({ link: this.link.value });
  }

  getLinkErrorMessage(): string {
    if (this.link.hasError('required')) {
      return 'You must enter a name.';
    }
    if (this.link.hasError('minlength')) {
      return `Minimum name length is ${this.MIN_LENGTH} character.`;
    }
    if (this.link.hasError('maxlength')) {
      return `Max name length is ${this.MAX_LENGTH} character.`;
    }
    return '';
  }

  private initFormWatcher(): void {
    this.link.statusChanges
      .pipe(takeUntil(this.subscriptions$))
      .subscribe(() => {
        this.linkErrorMessage = this.getLinkErrorMessage();
      });
  }

  ngOnDestroy(): void {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}

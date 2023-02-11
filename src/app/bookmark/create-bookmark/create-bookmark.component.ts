import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { BookmarksDocument, CreateBookmarkGQL } from 'src/generated-types';

@Component({
  selector: 'app-create-bookmark',
  templateUrl: './create-bookmark.component.html',
  styleUrls: ['./create-bookmark.component.scss'],
})
export class CreateBookmarkComponent implements OnInit, OnDestroy {
  private readonly MIN_LENGTH = 3;
  private readonly MAX_LENGTH = 50;

  bookmarkNameErrorMessage: string = '';

  bookmarkName = new FormControl('', [
    Validators.required,
    Validators.minLength(this.MIN_LENGTH),
    Validators.maxLength(this.MAX_LENGTH),
  ]);

  private subscriptions$ = new Subject<void>();

  constructor(
    private readonly createBookmarkGQL: CreateBookmarkGQL,
    private readonly dialogRef: MatDialogRef<CreateBookmarkComponent>
  ) {}

  ngOnInit(): void {
    this.initFormWatcher();
  }

  createBookmark() {
    if (this.bookmarkName.value) {
      this.createBookmarkGQL
        .mutate(
          {
            createBookmarkData: { name: this.bookmarkName.value },
          },
          {
            refetchQueries: [BookmarksDocument],
          }
        )
        .subscribe(() => this.dialogRef.close());
    }
  }

  getBookmarkNameErrorMessage(): string {
    if (this.bookmarkName.hasError('required')) {
      return 'You must enter a name.';
    }
    if (this.bookmarkName.hasError('minlength')) {
      return `Minimum name length is ${this.MIN_LENGTH} character.`;
    }
    if (this.bookmarkName.hasError('maxlength')) {
      return `Max name length is ${this.MAX_LENGTH} character.`;
    }
    return '';
  }

  private initFormWatcher(): void {
    this.bookmarkName.statusChanges
      .pipe(takeUntil(this.subscriptions$))
      .subscribe(() => {
        this.bookmarkNameErrorMessage = this.getBookmarkNameErrorMessage();
      });
  }

  ngOnDestroy(): void {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}

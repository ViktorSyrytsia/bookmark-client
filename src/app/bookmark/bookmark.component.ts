import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Bookmark, BookmarksGQL } from 'src/generated-types';
import { CreateBookmarkComponent } from './create-bookmark/create-bookmark.component';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
})
export class BookmarkComponent implements OnInit {
  bookmarks$?: Observable<Bookmark[]>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly bookmarksGQL: BookmarksGQL,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.bookmarks$ = this.bookmarksGQL
      .watch()
      .valueChanges.pipe(map((result) => result.data.bookmarks));
  }

  onBookmarkClick(bookmarkId: string) {
    this.router.navigate(['/bookmarks', bookmarkId]);
  }

  onFabClick() {
    this.dialog.open(CreateBookmarkComponent);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import {
  Bookmark,
  BookmarkDocument,
  BookmarkGQL,
  Link,
  LinksGQL,
  UpdateBookmarkGQL,
} from 'src/generated-types';
import { AddLinkComponent } from './add-link/add-link.component';

@Component({
  selector: 'app-bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.scss'],
})
export class BookmarkCardComponent implements OnInit, OnDestroy {
  bookmark$?: Observable<Bookmark>;
  links$?: Observable<Link[]>;

  isLoading = true;

  subscription$ = new Subject<void>();

  constructor(
    private readonly bookmarkGql: BookmarkGQL,
    private readonly linksGql: LinksGQL,
    private readonly updateBookmarkGql: UpdateBookmarkGQL,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.bookmark$ = this.route.params.pipe(
      switchMap(
        (param) => this.bookmarkGql.watch({ _id: param['id'] }).valueChanges
      ),
      map((result) => result.data.bookmark)
    );
    this.links$ = this.bookmark$.pipe(
      switchMap(
        (bookmark) => this.linksGql.watch({ urls: bookmark.links }).valueChanges
      ),
      map((result) => result.data.links),
      tap(() => (this.isLoading = false))
    );
  }

  onAdd(bookmark: Bookmark) {
    this.dialog
      .open(AddLinkComponent)
      .afterClosed()
      .pipe(
        takeUntil(this.subscription$),
        switchMap(({ link }) => {
          return this.updateBookmarkGql.mutate(
            {
              updateBookmarkData: {
                _id: bookmark._id,
                links: [...bookmark.links, link],
              },
            },
            {
              refetchQueries: [
                {
                  query: BookmarkDocument,
                  variables: {
                    _id: bookmark._id,
                  },
                },
              ],
            }
          );
        })
      )
      .subscribe();
  }

  onLinkClick(link: Link): void {
    window.open(link.url, '_blank')?.focus();
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }
}

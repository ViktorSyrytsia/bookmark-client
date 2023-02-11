import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarkComponent } from './bookmark.component';
import { CreateBookmarkModule } from './create-bookmark/create-bookmark.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { BookmarkCardModule } from "./bookmark-card/bookmark-card.module";
import { AddLinkModule } from "./bookmark-card/add-link/add-link.module";

@NgModule({
  declarations: [BookmarkComponent],
  imports: [
    CommonModule,
    CreateBookmarkModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    BookmarkCardModule,
    AddLinkModule
  ],
  exports: [BookmarkComponent],
})
export class BookmarkModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarkCardComponent } from './bookmark-card.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [BookmarkCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule
  ],
})
export class BookmarkCardModule {}

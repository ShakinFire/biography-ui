import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiographyService } from './biography.service';
import { GalleryService } from './gallery.service';
import { UserService } from './user.service';
import { CommentService } from './comment.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    BiographyService,
    GalleryService,
    UserService,
    CommentService,
  ]
})

export class ServicesModule { }

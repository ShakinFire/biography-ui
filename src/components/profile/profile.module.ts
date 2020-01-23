import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeadingComponent } from './heading/heading.component';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './profile.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { ProfileEditComponent } from './edit/profile-edit.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import {
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatIconModule,
} from '@angular/material';
import { ProfileImageDialogComponent } from './dialog/profile-image-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ServicesModule } from '../services/services.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    NgxGalleryModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ServicesModule,
    MatProgressSpinnerModule,
    ImageCropperModule,
  ],
  declarations: [
    HeadingComponent,
    ProfileComponent,
    GalleryComponent,
    ProfileEditComponent,
    ProfileImageDialogComponent,
  ],
  exports: [
    HeadingComponent,
    ProfileComponent,
    GalleryComponent,
    ProfileEditComponent,
    ProfileImageDialogComponent,
  ],
  entryComponents: [
    ProfileImageDialogComponent,
  ],
})

export class ProfileModule { }

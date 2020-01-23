import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProfileImageDialogComponent } from '../dialog/profile-image-dialog.component';
import { filter, takeUntil, first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GalleryService } from '../../services/gallery.service';
import { IUser } from '../../../interfaces/user.interface';
import { IGalleryImage } from '../../../interfaces/gallery-image.interface';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit, OnDestroy {
  @Input() public user: IUser;
  private readonly componentDestroyed$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly galleryService: GalleryService,
  ) {}

  ngOnInit() {
  }

  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public goToProfileEdit(): void {
    this.router.navigate(['profile-edit']);
  }

  public handleAddPhoto(event): void {
    this.dialog
    .open(ProfileImageDialogComponent, {
      data: event,
      minWidth: 650,
      disableClose: true,
    })
    .afterClosed()
    .pipe(
      filter((imageData) => !!imageData),
      takeUntil(this.componentDestroyed$),
    )
    .subscribe(async (imageData) => {
      await this.galleryService
        .addGalleryImage(this.user.id, { image: imageData.imageAsBase64 } as IGalleryImage).pipe(first()).toPromise();
      this.galleryService.signalPhotoAdd(imageData.imageAsBase64);
    });
  }
}

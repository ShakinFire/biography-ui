import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { GalleryService } from '../../services/gallery.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IUser } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {
  @Input() public user: IUser;
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];
  private readonly componentDestroyed$ = new Subject<void>();

  constructor(
    private readonly galleryService: GalleryService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.galleryService.getGalleryImagesByUserId(this.user.id)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((galleryImages) => {
        this.galleryImages = galleryImages.map((image) => ({
          small: image.image,
          medium: image.image,
          big: image.image,
        }));
        this.updateGalleryOptions(this.galleryImages.length);
      });


    this.galleryService.photoAdded.subscribe((photoInBase64: string) => {
      const galleryImagesHolder = this.galleryImages;
      this.galleryImages = null;
      this.changeDetectorRef.detectChanges();

      this.galleryImages = [
        {
          small: photoInBase64,
          medium: photoInBase64,
          big: photoInBase64,
        },
        ...galleryImagesHolder,
      ];

      this.updateGalleryOptions(this.galleryImages.length);
      this.changeDetectorRef.detectChanges();
    });
  }

  private getNumberOfRows(imageCount: number, numberOfCols: number): number {
    return Math.ceil(imageCount / numberOfCols);
  }

  private updateGalleryOptions(imageCount: number): void {
    this.galleryOptions = [
      {
        image: false,
        height: this.getNumberOfRows(imageCount, 3) * 300 + 'px',
        width: '100%',
        thumbnailsOrder: 3,
        thumbnailsRows: this.getNumberOfRows(imageCount, 3),
        thumbnailsColumns: 3,
        previewDownload: true,
      },
      // max-width 800
      {
        breakpoint: 900,
        thumbnailsOrder: 3,
        image: false,
        height: this.getNumberOfRows(imageCount, 2) * 200 + 'px',
        thumbnailsRows: this.getNumberOfRows(imageCount, 2),
        width: '100%',
        thumbnailsColumns: 2,
      },
      // max-width 400
      {
        breakpoint: 400,
        thumbnailsOrder: 3,
        image: false,
        height: this.getNumberOfRows(imageCount, 2) * 100 + 'px',
        thumbnailsRows: this.getNumberOfRows(imageCount, 2),
        width: '100%',
        thumbnailsColumns: 2,
      },
    ];
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import * as config from '../../config/config.json';
import { IGalleryImage } from '../../interfaces/gallery-image.interface.js';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GalleryService {
  public photoAdded: Subject<string> = new Subject<string>();

  constructor(
    private readonly http: HttpClient,
  ) { }

  public signalPhotoAdd(photo: string): void {
    this.photoAdded.next(photo);
  }

  public getGalleryImagesByUserId(userId: string): Observable<IGalleryImage[]> {
    return this.http.get<IGalleryImage[]>(`${config.apiUrl}/users/${userId}/gallery-image`);
  }

  public addGalleryImage(userId: string, galleryImage: IGalleryImage): Observable<IGalleryImage> {
    return this.http.post<IGalleryImage>(`${config.apiUrl}/users/${userId}/gallery-image`, galleryImage);
  }
}

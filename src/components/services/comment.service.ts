import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IComment } from '../../interfaces/comment.interface';
import { Observable } from 'rxjs';
import * as config from '../../config/config.json';

@Injectable()
export class CommentService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getCommentsByBiographyId(biographyId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${config.apiUrl}/biography/${biographyId}/comments`);
  }

  public addComment(comment: IComment, biographyId: string, userId: string): Observable<IComment> {
    return this.http.post<IComment>(`${config.apiUrl}/biography/${biographyId}/user/${userId}`, comment);
  }
}

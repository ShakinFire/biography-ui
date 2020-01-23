import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as config from '../../config/config.json';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from '../../interfaces/user.interface.js';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  public readonly currentUser$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

  constructor(private readonly http: HttpClient) { }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${config.apiUrl}/users`);
  }

  public async loadCurrentUser(): Promise<void> {
    const currentUser = await this.getUsers().pipe(map(users => users[1])).toPromise();
    this.currentUser$.next(currentUser);
  }

  public updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${config.apiUrl}/users/${user.id}`, user);
  }

}

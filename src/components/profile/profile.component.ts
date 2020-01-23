import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {
  private readonly componentDestroyed$: Subject<void> = new Subject<void>();
  public currentUser: IUser;

  constructor(
    private readonly userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.currentUser$
    .pipe(
      filter((user) => !!user),
      takeUntil(this.componentDestroyed$),
    )
    .subscribe((user) => {
      this.currentUser = user;
    });
  }

  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}

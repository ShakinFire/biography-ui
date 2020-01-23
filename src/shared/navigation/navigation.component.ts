import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../components/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit, OnDestroy {
  public user: IUser;
  private readonly componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) { }

  public ngOnInit(): void {
    this.userService.currentUser$
      .pipe(
        filter((user) => !!user),
        takeUntil(this.componentDestroyed$),
      )
      .subscribe((currentUser) => {
        this.user = currentUser;
      });
  }

  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public goToProfile(): void {
    this.router.navigate(['profile']);
  }

  public goToHome(): void {
    this.router.navigate(['']);
  }

}

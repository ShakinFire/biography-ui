import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileImageDialogComponent } from '../dialog/profile-image-dialog.component';
import { Subject, merge } from 'rxjs';
import { MatDialog } from '@angular/material';
import { takeUntil, filter, switchMap, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../../interfaces/user.interface';
import { BiographyService } from '../../services/biography.service';
import { IBiography } from '../../../interfaces/biography.interface';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})

export class ProfileEditComponent implements OnInit, OnDestroy {
  private readonly componentDestroyed$ = new Subject<void>();
  public profileImageEndpoint: string;
  public profileForm: FormGroup;
  public currentUser: IUser;
  public biography: IBiography;

  constructor(
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly biographyService: BiographyService,
  ) {}

  public ngOnInit(): void {
    this.userService.currentUser$
      .pipe(
        filter((user) => !!user),
        switchMap((user) => {
          this.currentUser = user;
          this.profileImageEndpoint = this.currentUser.avatarImage;
          return this.biographyService.getBiographies();
        }),
        map((biographies) => biographies.find((biography => biography.userId === this.currentUser.id))),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((biography) => {
        this.biography = biography;
        this.buildForm();
      });
  }

  public ngOnDestroy(): void {
    console.log('DESTROYED');
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public fileChange(fileEvent: Event): void {
    this.dialog
        .open(ProfileImageDialogComponent, {
          data: fileEvent,
          minWidth: 650,
          disableClose: true,
        })
        .afterClosed()
        .pipe(
          filter((imageData) => !!imageData),
          takeUntil(this.componentDestroyed$),
        )
        .subscribe((imageData) => {
          this.profileImageEndpoint = imageData.imageAsBase64;
          this.currentUser.avatarImage = imageData.imageAsBase64;
        });
  }

  public handleCancel(): void {
    this.router.navigate(['profile']);
  }

  public buildForm(): void {
    this.profileForm = this.formBuilder.group({
      username: this.formBuilder.control(this.currentUser.username || '', [Validators.required, Validators.max(35)]),
      name: this.formBuilder.control(this.currentUser.name, [Validators.required, Validators.max(35)]),
      email: this.formBuilder.control(this.currentUser.email, [Validators.email]),
      biography: this.formBuilder.control(this.biography.content || '', [Validators.max(1000)]),
    });
  }

  public handleSave(): void {
    let { biography, ...userToUpdate } = this.profileForm.value;
    userToUpdate = {
      ...this.currentUser,
      ...userToUpdate,
    };

    this.biography = {
      ...this.biography,
      content: this.profileForm.controls.biography.value,
    };

    const biographyAndUserRequests$ = merge(
      this.userService.updateUser(userToUpdate),
      this.biographyService.updateBiography(this.biography),
    );

    biographyAndUserRequests$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        this.router.navigate(['profile']);
      });
  }
}

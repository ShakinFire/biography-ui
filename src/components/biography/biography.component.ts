import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BiographyService } from '../services/biography.service';
import { IComment } from '../../interfaces/comment.interface';
import { UserService } from '../services/user.service';
import { takeUntil, switchMap, map, filter, first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';
import { CommentService } from '../services/comment.service';
import { IBiography } from '../../interfaces/biography.interface';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent implements OnInit, OnDestroy {
  public commentFormControl: FormControl;
  public comments: IComment[] = [];
  public currentUser: IUser;
  public users: IUser[] = [];
  public commentsWithUsers: any[] = [];
  public biography: IBiography;
  private readonly componentDestroyed$: Subject<any> = new Subject<void>();

  constructor(
    private readonly biographyService: BiographyService,
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) { }

  public ngOnInit() {
    this.commentFormControl = new FormControl('', [Validators.max(200)]);

    this.userService.currentUser$
      .pipe(
        filter((user) => !!user),
        takeUntil(this.componentDestroyed$),
      )
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
      });

    this.userService.getUsers()
      .pipe(
        switchMap((users) => {
          this.users = users;
          return this.biographyService.getBiographies();
        }),
        map((biographies) => biographies.find((biography => biography.userId === this.users[1].id))),
        switchMap((currentBiography) => {
          this.biography = currentBiography;
          return this.commentService.getCommentsByBiographyId(this.biography.id);
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((comments) => {
        this.comments = comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        this.commentsWithUsers = this.comments.reduce((result, currentComment) => {
          const userForCurrentComment = this.users.find((user) => user.id === currentComment.userId);
          const modifiedComment = { ...currentComment, user: userForCurrentComment };
          return [...result, modifiedComment];
        }, []);
      });

  }

  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public async handleAddComment(): Promise<void> {
    if (this.commentFormControl.value && this.commentFormControl.value !== '') {
      await this.commentService.addComment({ content: this.commentFormControl.value } as IComment, this.biography.id, this.currentUser.id)
        .pipe(first()).toPromise();
      this.commentsWithUsers.push(
        {
          content: this.commentFormControl.value,
          createdAt: new Date(),
          user: this.currentUser,
        },
      );
      this.commentFormControl.reset();
    }
  }

}

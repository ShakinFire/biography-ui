import { Component, OnInit } from '@angular/core';
import { UserService } from '../components/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private readonly userService: UserService) { }

  public ngOnInit(): void {
    this.userService.loadCurrentUser();
  }
}

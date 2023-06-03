import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  username = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsername().subscribe((username) => {
      this.username = username;
    });
  }
}

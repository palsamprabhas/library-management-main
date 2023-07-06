import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  constructor(private userService: UserService) { }
  responseData: any;
  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const usernameValue = localStorage.getItem('username');
    if (usernameValue) {
      this.userService.getUserByUsername(usernameValue).subscribe(
        (response) => {
          this.responseData = response;
          console.log(response);
        });
    }
  }

  }

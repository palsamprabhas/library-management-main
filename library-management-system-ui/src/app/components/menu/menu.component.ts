import { Component, OnInit } from '@angular/core';
import { UrlSegment, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isUserLoggedIn = false;
  isAdmin = false;
  isStudent = false;
  role: any

  constructor(public router: Router) { }

  ngOnInit(): void {
      var username = localStorage.getItem("username");
      var role = localStorage.getItem("role")
      if (username != null && username != '') {
        this.isUserLoggedIn = true;
        if (role == "Admin") {
          console.log("isstudent"+this.isStudent);
          this.isAdmin = true;
        } else if (role == "Student") {
          this.isStudent = true;
        }
      } else {
        this.isUserLoggedIn = false;
      }
  }
}




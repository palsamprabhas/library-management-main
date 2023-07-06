import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  loginResponse:any;
  isLoginFailed = false;
  constructor(public router:Router,public userservice:UserService) { 
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }


  onSubmit(){
    this.router.navigate(['/register']);
  }

  login(){
    console.log(this.loginForm.value);
    this.userservice.login(this.loginForm.value).subscribe(
      (response)=>{
        this.loginResponse = response;
        localStorage.setItem("username", response.username);
        localStorage.setItem("role", response.role);
        console.log(localStorage.getItem("username")+" "+localStorage.getItem("role"));
        if (response.role == "Admin") {
          this.router.navigateByUrl('book')
        } else if (response.role == "Student") {
          this.router.navigateByUrl('student')
        }
      },
      (error) => {
        this.isLoginFailed = true        
      }
    ); 
  }
}

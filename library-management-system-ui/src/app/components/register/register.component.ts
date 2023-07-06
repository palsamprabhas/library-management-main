import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertpopupComponent } from '../popup/updatepopup/alertpopup/alertpopup.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerResponse: any;
  invalidDetails:any=false;
  constructor(public router: Router, public userservice: UserService,private dialog: MatDialog) {
    this.registerForm = new FormGroup({
      userid: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.router.navigate(['/login']);
  }
  register() {
    if (this.registerForm.valid) {
      const register = {
        username: this.registerForm.value.userid,
        password: this.registerForm.value.password,
        role: this.registerForm.value.role,
      };
      console.log(register);
      this.userservice.addUser(register).subscribe(
        (response) => {
          this.registerResponse = response;
          const dialogRef = this.dialog.open(AlertpopupComponent, {
            data: { isRegisterUser: true, registerUserResponse: response }
          });
          console.log(this.registerResponse);
        });
    }
    else{
      this.invalidDetails=true
    }
  }
}

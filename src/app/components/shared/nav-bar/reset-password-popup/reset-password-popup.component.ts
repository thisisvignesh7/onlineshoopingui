import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-reset-password-popup',
  templateUrl: './reset-password-popup.component.html',
  styleUrls: ['./reset-password-popup.component.css']
})
export class ResetPasswordPopupComponent {
  
  baseUrl = 'https://localhost:7106/api/v1.0/shopping/';
  resetPasswordForm!: FormGroup;
  firstName:any;
  lastName:any;
  email:any;
  contactNumber:any;
  loginId:any;
  role:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private loader: NgxUiLoaderService,
    private toast: ToastrService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.loader.start();

    this.resetPasswordForm = new FormGroup({
      password: new FormControl(null, Validators.required),
      respassword: new FormControl(null, Validators.required)
      //password: new FormControl(null, Validators.required),
    });

    let url = this.baseUrl + 'user/' + this.data.userId;
    this.httpClient.get(url).subscribe((result:any) => {
      if(result.success) {
        this.firstName = result.data.firstName;
        this.lastName = result.data.lastName;
        this.email = result.data.email;
        this.contactNumber = result.data.contactNumber;
        this.loginId = result.data.loginId;
        this.role = result.data.role;
        this.loader.stop();
      }
    },
    (error:any) => {
      this.loader.stop()
    })
  }

  resetPasword() {
    this.loader.start();
    let url = this.baseUrl + this.loginId + '/forgot';
    let payload = {
      "userId": this.data.userId,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.email,
      "contactNumber": this.contactNumber,
      "loginId": this.loginId,
      "password": this.resetPasswordForm.value.password,
      "role": this.role
    }

    this.httpClient.put(url, payload).subscribe((result: any) => {
      if(result.success) {
        localStorage.removeItem('token');
        window.location.reload();
        this.loader.stop();
        this.toast.success("Your password reset is successful, please login again to continue", "Success", {timeOut: 2000});
      }
    },
    (error:any) => {
      this.loader.stop();
      this.toast.error('Something went wrong. Please try again', 'Error', {
        timeOut: 2000,
      });
    })
  }

}

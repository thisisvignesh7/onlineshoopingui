import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordPopupComponent } from './reset-password-popup/reset-password-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  baseUrl = 'https://localhost:7106/api/v1.0/shopping/';
  isDropdownOpen: boolean = false;
  currentUserId: any;
  currentUserName: any;
  currentUserFullName: any;
  isAdmin: boolean = false;
  searchText:any = '';

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private authService: AuthService,
    private loader: NgxUiLoaderService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if(!localStorage.getItem('token')) {
      this.router.navigate(["login"])
    }
    // let tokenData = this.authService.decodedToken();
    // this.isAdmin = tokenData.role == 'Admin' ? true : false;
    //this.loader.start();
    let tokenData = this.authService.decodedToken();
    this.currentUserId = tokenData.userId;
    this.currentUserName = tokenData.userName;
    this.isAdmin = tokenData.role == 'Admin' ? true : false;

    let url = this.baseUrl + 'user/' + this.currentUserId;
    this.httpClient.get(url).subscribe(
      (result: any) => {
        if (result.data) {
          this.currentUserFullName =
            result.data.firstName + ' ' + result.data.lastName;
        }
        this.loader.stop();
      },
      (error: any) => {
        this.loader.stop();
      }
    );
  }

  logOut() {
    this.loader.start();
    localStorage.removeItem('token');
    this.loader.stop();
    this.toast.success("You're successfully logged out", 'Success', {
      timeOut: 2000,
    });
    this.router.navigate(['login']);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  resetPasswordPopup() {
    let dialogRef = this.dialog.open(ResetPasswordPopupComponent, {
      disableClose: true,
      data: {
        userId: this.currentUserId,
        
      }
    })
  }

  searchPage() {
    if(this.searchText === '') {
      this.toast.warning("Search box is empty", "", {timeOut: 1500});
    }
    else {
      this.router.navigate(['search/'+this.searchText]);
    }
  }
}

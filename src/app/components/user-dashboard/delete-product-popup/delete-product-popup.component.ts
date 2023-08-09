import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderComponent, NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-delete-product-popup',
  templateUrl: './delete-product-popup.component.html',
  styleUrls: ['./delete-product-popup.component.css'],
})
export class DeleteProductPopupComponent {
  baseUrl = 'https://localhost:7106/api/v1.0/shopping/';
  productId: any;

  constructor(
    private loader: NgxUiLoaderService,
    private toast: ToastrService,
    private dialogRef: MatDialogRef<DeleteProductPopupComponent>,
    private httpClient: HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productId = data.productId;
  }

  ngOnInit() {}

  deleteProduct() {
    this.loader.start();
    let url = this.baseUrl+this.data.productName+'/delete/'+this.data.productId
    this.httpClient.delete(url).subscribe((result:any) => {
      if(result.success) {
        this.toast.success("Selected product has been deleted", 'Success', {timeOut: 2000});
        window.location.reload();
        this.loader.stop();
      }
    },
    (error:any) => {
      this.loader.stop();
      this.toast.error("Smething went wrong, please try again", 'Error', {timeOut: 2000});
    });
  }
}

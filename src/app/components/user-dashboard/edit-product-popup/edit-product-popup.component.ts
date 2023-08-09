import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-edit-product-popup',
  templateUrl: './edit-product-popup.component.html',
  styleUrls: ['./edit-product-popup.component.css'],
})
export class EditProductPopupComponent {
  baseUrl = 'https://localhost:7106/api/v1.0/shopping/';
  updateProductForm!: FormGroup;
  productName: any;
  description: any;
  price: any;
  features: any;
  noOfOrdersPlaced: any;
  quantityAvailable: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private loader: NgxUiLoaderService,
    private toast: ToastrService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    console.log(this.data)
    // this.loader.start();

    this.updateProductForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      noOfOrderPlaced: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      quantityAvailable: new FormControl(null, Validators.required),
      features: new FormControl(null, Validators.required),
    });

    if(this.data) {
      this.updateProductForm.controls['productName'].setValue(this.data.tableData.productName)
      this.updateProductForm.controls['noOfOrderPlaced'].setValue(this.data.tableData.noOfOrdersPlaced)
      this.updateProductForm.controls['description'].setValue(this.data.tableData.description)
      this.updateProductForm.controls['price'].setValue(this.data.tableData.price)
      this.updateProductForm.controls['quantityAvailable'].setValue(this.data.tableData.quantityAvaiable)
      this.updateProductForm.controls['features'].setValue(this.data.tableData.features)
    }

  }

  updateProduct() {
   this.loader.start();

   let url = this.baseUrl + this.data.tableData.productName + '/update/' + this.data.tableData.productId;
   let payload = {
    "productId": this.data.tableData.productId,
    "productName": this.updateProductForm.value.productName,
    "description": this.updateProductForm.value.description,
    "price": this.updateProductForm.value.price,
    "features": this.updateProductForm.value.features,
    "noOfOrdersPlaced": this.updateProductForm.value.noOfOrdersPlaced,
    "quantityAvailable": this.updateProductForm.value.quantityAvailable
   }
   this.httpClient.put(url, payload).subscribe((result:any) => {
    if(result.success) {
      this.toast.success("Product sucessfully updated", 'Success', {timeOut: 2000});
      window.location.reload();
      this.loader.stop();
    }
   },
   (error:any) => {
    this.loader.stop();
      this.toast.error("Smething went wrong, please try again", 'Error', {timeOut: 2000});
   })
  }
}

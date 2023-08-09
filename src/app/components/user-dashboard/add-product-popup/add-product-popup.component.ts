import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-add-product-popup',
  templateUrl: './add-product-popup.component.html',
  styleUrls: ['./add-product-popup.component.css']
})
export class AddProductPopupComponent {

  addProductForm!: FormGroup;
  baseUrl = 'http://localhost:8082/api/v1.0/shopping/';

  constructor(
    private router: Router,
    private loader: NgxUiLoaderService,
    private httpClient: HttpClient,
    private toast: ToastrService,
    private dialogRef: MatDialogRef<AddProductPopupComponent>,
  ) {}

  ngOnInit() {
    this.addProductForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      noOfOrderPlaced: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      quantityAvailable: new FormControl(null, Validators.required),
      features: new FormControl(null, Validators.required)
    });
  }

  addNewProduct() {
    this.loader.start();
    let url = this.baseUrl + this.addProductForm.value.productName + '/add';
    let payload = {
      "productName": this.addProductForm.value.productName,
      "description": this.addProductForm.value.description,
      "price": this.addProductForm.value.price,
      "features": this.addProductForm.value.features,
      "noOfOrdersPlaced": this.addProductForm.value.noOfOrderPlaced,
      "quantityAvailable": this.addProductForm.value.quantityAvailable
    }

    this.httpClient.post(url, payload).subscribe((result:any) => {
      if(result.success) {
        this.toast.success("Product added successfully", 'Success', {timeOut: 2000});
        this.addProductForm.controls['productName'].setValue("")
        this.addProductForm.controls['noOfOrderPlaced'].setValue("")
        this.addProductForm.controls['description'].setValue("")
        this.addProductForm.controls['price'].setValue("")
        this.addProductForm.controls['quantityAvailable'].setValue("")
        this.addProductForm.controls['features'].setValue("")
        this.loader.stop();
      }
    },
    (error:any) => {
      this.toast.success("Something went wrong, please try again", 'Error', {timeOut: 2000});
        this.loader.stop();
    })
  }

  closePopup() {
    this.dialogRef.close();
    window.location.reload();
  }

}

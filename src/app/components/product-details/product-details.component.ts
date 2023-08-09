import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  baseUrl = 'http://localhost:8082/api/v1.0/shopping/';
  productId:any;
  description:any;
  features:any;
  price;
  productName:any;
  productStatus:any;

  constructor(
    private activatdRoute: ActivatedRoute,
    private route: Router,
    private loader: NgxUiLoaderService,
    private httpClient: HttpClient
    ) {
    let getProductId = this.activatdRoute.params.subscribe((params: Params) => {
      this.productId = params['productId'];
    });
  }

  ngOnInit() {
    if(!localStorage.getItem('token')) {
      this.route.navigate(['login']);
    }

    this.loader.start();
    let url = this.baseUrl + 'products/' + this.productId;
    this.httpClient.get(url).subscribe((result:any) => {
      if(result.success) {
        //console.log(result.data);
        this.description = result.data.description;
        this.features = result.data.features;
        this.price = result.data.price;
        this.productStatus = result.data.productStatus;
        this.productName = result.data.productName;
        this.loader.stop();
      }
    },
    (error:any) => {
      this.loader.stop();
    });
  }

}

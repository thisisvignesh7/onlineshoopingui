import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Params, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent {

  baseUrl = 'https://localhost:7106/api/v1.0/shopping/';
  searchText:any;
  isNoData: boolean = false;
  data: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
    private httpClient: HttpClient,
    private route: Router
  ) {
    let getProductId = this.activatedRoute.params.subscribe((params: Params) => {
      this.searchText = params['searchText'];
    });
  }

  ngOnInit() {
    if(!localStorage.getItem('token')) {
      this.route.navigate(['login'])
    }
    this.loader.start();
    let url = this.baseUrl + 'products/search/' + this.searchText;

    this.httpClient.get(url).subscribe((result:any) => {
      if(result.data.length > 0) {
        // console.log(result.data);
        this.data = result.data;
        this.loader.stop()
      }
      else {
        this.isNoData = true;
      }
    },
    (error:any) => {
      this.loader.stop();
    });
  }

  productDetails(productId) {
    this.route.navigate(['product-deatils/'+productId]);
  }

}

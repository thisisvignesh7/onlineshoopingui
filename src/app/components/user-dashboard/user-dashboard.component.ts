import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductPopupComponent } from './add-product-popup/add-product-popup.component';
import { EditProductPopupComponent } from './edit-product-popup/edit-product-popup.component';
import { DeleteProductPopupComponent } from './delete-product-popup/delete-product-popup.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  baseUrl = 'http://localhost:8082/api/v1.0/shopping/';
  isAdmin: boolean = false;
  currentUserRole: any;
  displayedColumns: string[] = [
    'position',
    'productId',
    'productName',
    'description',
    'features',
    'price',
    'noOfOrdersPlaced',
    'quantityAvaiable',
    'productStatus',
    'Action',
  ];
  // dataSource!: new MatTableDataSource<any>;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchText = '';
  dataForUser: any;

  constructor(
    private router: Router,
    private loader: NgxUiLoaderService,
    private httpClient: HttpClient,
    private authService: AuthService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['login']);
    } else {
      this.loader.start();
      let tokenData = localStorage.getItem('role')

      this.isAdmin = tokenData == 'ROLE_ADMIN' ? true : false;

      let url = this.baseUrl + 'all';
      this.httpClient.get(url).subscribe(
        (result: any) => {
          if (result.data) {
            //this.dataSource = resul]t.data;
            this.dataSource = new MatTableDataSource(result.data);
            this.dataForUser = result.data;
            // console.log(this.dataForUser);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.loader.stop();
          }
        },
        (error: any) => {
          this.loader.stop();
        }
      );
    }
  }

  addNewProductPopup() {
    let dialogRef = this.dialog.open(AddProductPopupComponent, {
      disableClose: true,
      data: {},
    });
  }
  editProductPopup(tableData) {
    let dialogRef = this.dialog.open(EditProductPopupComponent, {
      disableClose: true,
      data: {
        tableData: tableData,
      },
    });
  }

  deleteProductPopup(productId, productName, price) {
    let dislogRef = this.dialog.open(DeleteProductPopupComponent, {
      disableClose: true,
      data: {
        productId: productId,
        productName: productName,
        price: price,
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  productDetails(productId) {
    this.router.navigate(['product-deatils/' + productId]);
  }
}

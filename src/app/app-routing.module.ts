import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { authGuard } from './services/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SearchProductsComponent } from './components/search-products/search-products.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    //canActivate: [authGuard],
  },
  { path: 'product-deatils/:productId', component: ProductDetailsComponent },
  { path: 'search/:searchText', component: SearchProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

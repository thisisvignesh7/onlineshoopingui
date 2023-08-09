import { Injectable } from '@angular/core';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // currentUserId: any;
  // currentUserRole: any;
  token:any = localStorage.getItem('token')
  constructor() {}

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    return jwtHelper.decodeToken(token);
  }
}

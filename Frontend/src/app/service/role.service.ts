import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addRole(roleDate: any) {
    return this.http.post(`${this.apiUrl}/role`, roleDate);
  }

  // Fetches all role data.
  getAllRole() {
    return this.http.get(`${this.apiUrl}/roles`);
  }

  // Fetches single user's role.
  getUserRole() {
    return sessionStorage.getItem('userrole') != null
      ? sessionStorage.getItem('userrole')?.toString()
      : '';
  }
}

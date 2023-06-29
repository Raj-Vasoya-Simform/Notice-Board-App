import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // User API URL
  apiUrl = 'http://localhost:3000';

  // Role API URL
  role_apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Fetches all user data.
  getAll() {
    return this.http.get(`${this.apiUrl}/users`);
  }

  // Fetches user by id.
  getById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Perform user Registration
  register(inputData: any) {
    return this.http.post(`${this.apiUrl}/user`, inputData);
  }
  // Update's the user details
  updateUser(id: string, inputData: any) {
    return this.http.put(`${this.apiUrl}/user/${id}`, inputData);
  }

  // Check if user is loggedIn or not
  isLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }


}

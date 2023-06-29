import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import {
  UpdateStatusComponent,
  User,
} from '../update-status/update-status.component';
import { Users } from '../auth/login/login.component';
import { RoleComponent } from '../role/role.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // List of item to display in table
  displayedColumns: string[] = [
    'username',
    'name',
    'email',
    'role',
    'status',
    'action',
  ];
  dataSource: any;
  userList: User[] = [];

  constructor(private authService: AuthService, private dialog: MatDialog) {
    this.LoadUser();
  }

  // Loading all the user's
  LoadUser() {
    this.authService.getAll().subscribe((res: Users) => {

      console.log(res);
      if (Array.isArray(res.data)) {
        this.userList = res.data as User[];
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  // Update user dialog box
  updateUser(id: any) {
    const popup = this.dialog.open(UpdateStatusComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '25%',
      data: {
        userData: id,
      },
    });

    // Loading user's data after updation
    popup.afterClosed().subscribe((res) => {
      this.LoadUser();
    });
  }

  openDialog() {}

  addRole(){
    const popup = this.dialog.open(RoleComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '25%',
    });
  }
}

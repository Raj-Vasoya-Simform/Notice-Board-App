import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleService } from '../service/role.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Users } from '../auth/login/login.component';
import { AuthService } from '../auth/service/auth.service';

// User interface
export interface User {
  email: string;
  id: string;
  isActive: boolean;
  name: string;
  password: string;
  role: string;
}

export interface role extends Object {
  data?: Array<any>;
}

export interface Role {
  id: string;
  name: string;
}

export interface RoleList {
  [key: string]: Role;
}

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss'],
})
export class UpdateStatusComponent implements OnInit {
  roleList: RoleList | undefined;

  editData!: User;

  // Update user form
  updatedForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl('', Validators.required),
    isActive: new FormControl(false),
  });

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<UpdateStatusComponent>
  ) {}

  ngOnInit(): void {
    // Checking the user's Role.
    this.roleService.getAllRole().subscribe((res: any) => {
      if (Array.isArray(res.data)) {
        this.roleList = res.data.reduce((acc: RoleList, item: Role) => {
          acc[item.id] = item;
          return acc;
        }, {} as RoleList);
      }
    });

    // Updating the user.
    if (this.data.userData != null && this.data.userData != '') {
      this.authService.getById(this.data.userData).subscribe((res: Users) => {
        this.editData = res.data![0];

        this.updatedForm.setValue({
          id: this.editData?.id, // Assign a default value ('') if id is undefined
          name: this.editData?.name,
          password: this.editData?.password,
          email: this.editData?.email,
          role: this.editData?.role,
          isActive: this.editData?.isActive || false,
        });
      });
    }
  }

  // Update user functionality dialog box
  updateUser() {
    if (this.updatedForm.valid) {
      this.authService
        .updateUser(this.updatedForm.value.id as string, this.updatedForm.value)
        .subscribe((res) => {
          this.toastr.success('Updated Successfully.', 'Success', {
            timeOut: 1000,
          });
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Please Select Role');
    }
  }
}

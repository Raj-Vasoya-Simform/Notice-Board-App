import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../service/role.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent {
  constructor(
    private roleService: RoleService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<RoleComponent>
  ) {}

  roleForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });

  onAddRole() {
    if (this.roleForm.valid) {
      this.roleService.addRole(this.roleForm.value).subscribe((res) => {
        // Success toastr
        this.toastr.success('Role Added Successfully.', 'Success', {
          timeOut: 1000,
        });
      });
      this.router.navigate(['/user']);
    } else {
      // Error Toastr
      this.toastr.warning('Please enter valid data.');
      this.router.navigate(['/user']);
    }
    this.dialog.close();
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoticeService } from '../service/notice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private router: Router,
    private noticeService: NoticeService,
    private toastr: ToastrService
  ) {}

  // Notice Form

  noticeForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    uploadDate: new FormControl('', Validators.required),
  });

  // Add Notice Functionality
  onAddNotice() {
    if (this.noticeForm.valid) {
      this.noticeService.addNotice(this.noticeForm.value).subscribe((res) => {
        // Success toastr
        this.toastr.success('Notice Successfully.', 'Success', {
          timeOut: 1000,
        });
      });
      this.router.navigate(['/notice']);
    } else {
      // Error Toastr
      this.toastr.warning('Please enter valid data.');
      this.router.navigate(['/add-notice']);
    }
  }

  // On Don't Add resetting the form
  onDontAdd() {
    // Clear the form fields
    this.noticeForm.reset();
  }
}

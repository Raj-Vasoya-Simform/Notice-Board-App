import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NoticeService } from '../service/notice.service';
import { Users } from '../auth/login/login.component';

export interface Notice {
  description: string;
  id: number;
  title: string;
  uploadDate: string;
}

@Component({
  selector: 'app-update-notice',
  templateUrl: './update-notice.component.html',
  styleUrls: ['./update-notice.component.scss'],
})
export class UpdateNoticeComponent implements OnInit {
  editedNotice!: any[];

  // Update Notice Form
  updateNoticeForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    uploadDate: new FormControl('', Validators.required),
  });

  constructor(
    private noticeService: NoticeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<UpdateNoticeComponent>
  ) {}
  ngOnInit(): void {
    // Checking and updating the notice.
    if (this.data.noticeData != null && this.data.noticeData != '') {
      this.noticeService
        .getById(this.data.noticeData)
        .subscribe((res: Users) => {
          this.editedNotice = [res.data![0]];

          for (const notice of this.editedNotice) {
            this.updateNoticeForm.setValue({
              id: notice?.id,
              title: notice?.title,
              description: notice?.description,
              uploadDate: notice?.uploaddate,
            });
          }
        });
    }
  }

  updateNotice() {
    if (this.updateNoticeForm.valid) {
      this.noticeService
        .updateNotice(
          this.updateNoticeForm.value.id,
          this.updateNoticeForm.value
        )
        .subscribe((res) => {
          this.toastr.success('Updated Successfully.', 'Success', {
            timeOut: 1000,
          });
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}

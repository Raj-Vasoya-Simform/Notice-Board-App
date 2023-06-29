import { Component, DoCheck, ViewChild } from '@angular/core';
import { NoticeService } from '../service/notice.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateNoticeComponent } from '../update-notice/update-notice.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/service/auth.service';
import { RoleService } from '../service/role.service';
import { MatAccordion } from '@angular/material/expansion';
import { Users } from '../auth/login/login.component';

// Notice interface
export interface Notice {
  title: string;
  description: string;
  uploaddate: Date;
  id: number;
}

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
})
export class NoticeComponent implements DoCheck {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  noticeList: Notice[] = [];
  isAdminUser = false;
  searchTitle: any;
  searchList: Notice[] = [];
  inListForm = false;
  showFiller = false;

  constructor(
    private noticeService: NoticeService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private authService: AuthService,
    private roleService: RoleService
  ) {
    this.LoadNotice();
  }

  // Loading all notices
  LoadNotice() {
    this.noticeService.getAllNotice().subscribe((res: Users) => {
      this.noticeList = res.data as Notice[];
      this.searchList = [...this.noticeList]; // Assign the fetched data to searchList as well
    });
  }

  // Update Notice functionality
  updateNotice(id: number) {
    const popup = this.dialog.open(UpdateNoticeComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '20%',
      data: {
        noticeData: id,
      },
    });
    // After closing dialogbox
    popup.afterClosed().subscribe((res) => {
      this.LoadNotice();
    });
  }
  // opening dialogbox
  openDialog() {}

  deleteNotice(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      // Show a confirmation dialog to the user
      const confirmed = confirm('Are you sure you want to delete this notice?');

      if (confirmed) {
        // User confirmed the deletion, proceed with the deletion logic
        this.noticeService.deleteNotice(id).subscribe(
          () => {
            // Success toastr
            this.toastr.success('Notice deleted successfully.', 'Success', {
              timeOut: 1000,
            });
            resolve(true);
            this.LoadNotice();
          },
          (error) => {
            // Error toastr
            this.toastr.error('An error occurred while deleting the notice.');
            reject(error);
          }
        );
      } else {
        // User cancelled the deletion
        this.toastr.info('Deletion cancelled.', '', {
          timeOut: 1000,
        });
        resolve(false);
      }
    });
  }

  // Sort by date functionality
  sortNoticesByDate() {
    // Sorting noticeList based on the uploaddate property
    this.noticeList.sort(
      (a, b) =>
        new Date(a.uploaddate).getTime() - new Date(b.uploaddate).getTime()
    );

    // Sorting searchList based on the uploaddate property
    this.searchList.sort(
      (a, b) =>
        new Date(a.uploaddate).getTime() - new Date(b.uploaddate).getTime()
    );
  }

  // Search by Title functionality
  searchByTitle() {
    if (this.searchTitle) {
      const lowerCaseSearchTitle = this.searchTitle.toLowerCase();
      this.searchList = this.noticeList.filter((notice) =>
        notice.title.toLowerCase().includes(lowerCaseSearchTitle)
      );
    } else {
      this.searchList = this.noticeList;
    }
  }

  changeGrid() {
    this.inListForm = !this.inListForm;
  }

  // Check for admin
  ngDoCheck(): void {
    if (this.roleService.getUserRole() === 'admin') {
      this.isAdminUser = true;
    } else {
      this.isAdminUser = false;
    }
  }
}

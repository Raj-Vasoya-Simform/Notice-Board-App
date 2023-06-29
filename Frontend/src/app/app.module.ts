import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { UpdateStatusComponent } from './update-status/update-status.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { NoticeComponent } from './notice/notice.component';
import { UpdateNoticeComponent } from './update-notice/update-notice.component';
import { RoleComponent } from './role/role.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    UpdateStatusComponent,
    HeaderComponent,
    NoticeComponent,
    UpdateNoticeComponent,
    RoleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthGuard], //Providing Auth guard
  bootstrap: [AppComponent],
})
export class AppModule {}

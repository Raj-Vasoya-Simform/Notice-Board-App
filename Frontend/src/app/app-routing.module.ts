import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { NoticeComponent } from './notice/notice.component';

const routes: Routes = [
  // Home page route
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  // Add notice route
  {
    path: 'add-notice',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  // User's list route (only accessible to admin)
  {
    path: 'user',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin'],
    },
  },
  // Notice list route (accessible to all)
  {
    path: 'notice',
    component: NoticeComponent,
  },
  // Auth route
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

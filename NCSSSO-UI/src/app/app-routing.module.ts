import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationListComponent } from './application-list/application-list.component';
import { AppInfoComponent } from './common/app-info/app-info.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { LoginComponent } from './common/login/login.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { UserListComponent } from './user-list/user-list.component';
import {RoleListComponent} from './role-list/role-list.component'
import { RoleManuItemComponent } from './role-manu-item/role-manu-item.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'info',
    component: AppInfoComponent
  },
  {
    path: 'logout',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'applicationlist',
    component: ApplicationListComponent
  }
  ,
  {
    path: 'orglist',
    component: OrganizationListComponent
  },
  {
    path: 'userlist',
    component: UserListComponent
  },{
    path:'rolelist',
    component: RoleListComponent
  }
  ,
  {
    path: 'rolelist',
    component: RoleListComponent
  },
  {
    path: 'rolemenuitem',
    component: RoleManuItemComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

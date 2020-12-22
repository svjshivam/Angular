import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';


//common 
import { HttpServiceService } from './common/service/http-service.service';
import { ServiceLocatorService } from './common/service/service-locator.service';
import { EndpointServiceService } from './common/service/endpoint-service.service';
import { DataValidatorService } from './common/service/data-validator.service';
import { ErrorComponent } from './common/error.component';
import { ListHeaderComponent } from './common/list-header/list-header.component';
import { ListBodyComponent } from './common/list-body/list-body.component';

//custom modules 
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { AppInfoComponent } from './common/app-info/app-info.component';
import { LoginComponent } from './common/login/login.component';
import { FormErrorComponent } from './common/form-error';
import { FormInputComponent } from './common/form-input';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleManuItemComponent } from './role-manu-item/role-manu-item.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ErrorComponent,
    FormErrorComponent,
    FormInputComponent,
    ListHeaderComponent,
    ListBodyComponent,
    ApplicationListComponent,
    OrganizationListComponent,
    UserListComponent,
    AppInfoComponent,
    RoleListComponent,
    RoleManuItemComponent
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    HttpServiceService,
    ServiceLocatorService,
    EndpointServiceService,
    DataValidatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

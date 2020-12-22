import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseListCtl } from '../common/base-list.component';
import { ServiceLocatorService } from '../common/service/service-locator.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent extends BaseListCtl {

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(locator.endpoints.APPLICATION, locator, route);
  }
  
  public statusList = ["Active","Inactive"];
  
  populateForm(form, data) {
    form.id = data.id;
    form.name = data.name;
    form.applicationCode = data.applicationCode;
    form.address = data.address;    
    form.email = data.email;    
    form.phone = data.phone;    
    form.appUrl = data.appUrl;    
    form.status = data.status;    
    console.log('----->', data);
  }

}

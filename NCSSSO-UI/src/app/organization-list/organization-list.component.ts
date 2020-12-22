import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseListCtl } from '../common/base-list.component';
import { ServiceLocatorService } from '../common/service/service-locator.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent extends BaseListCtl {

  public statusList = ["Active","Inactive"];
  
  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(locator.endpoints.ORGANIZATION, locator, route);
  }

  populateForm(form, data) {
    form.id = data.id;
    form.name = data.name;
    form.orgCode = data.orgCode;
    form.address = data.address;
    form.phone = data.phone;
    form.email = data.email;
    form.status = data.status;
    console.log('----->', data);
  }

}

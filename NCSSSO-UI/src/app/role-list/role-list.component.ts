import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseListCtl } from '../common/base-list.component';
import { ServiceLocatorService } from '../common/service/service-locator.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent extends BaseListCtl {

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(locator.endpoints.ROLE, locator, route);
  }

  populateForm(form, data) {
    form.id = data.id;
    form.name = data.name;
    console.log('----->', data);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseListCtl } from '../common/base-list.component';
import { ServiceLocatorService } from '../common/service/service-locator.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseListCtl {

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(locator.endpoints.USER, locator, route);
  }

  populateForm(form, data) {
    form.id = data.id;
    form.name = data.name;
    console.log('----->', data);
  }

}

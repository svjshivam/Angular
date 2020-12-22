import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseListCtl } from '../common/base-list.component';
import { ServiceLocatorService } from '../common/service/service-locator.service';

@Component({
  selector: 'app-role-manu-item',
  templateUrl: './role-manu-item.component.html',
  styleUrls: ['./role-manu-item.component.css']
})
export class RoleManuItemComponent extends BaseListCtl {

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(locator.endpoints.ROLEMENUITEM, locator, route);
  }

  populateForm(form, data) {
    form.id = data.id;
    form.name = data.name;
    console.log('----->', data);
  }

}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceLocatorService } from '../service/service-locator.service';

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.css']
})
export class AppInfoComponent implements OnInit {

  public locator = null;
  public data = {
    baseApi : "",
    docApi : "",
  }

  constructor(public loc: ServiceLocatorService,
    public route: ActivatedRoute) {
    this.locator = loc;
  }

  ngOnInit() {
    this.data.baseApi =  this.locator.endpoints.SERVER_URL;
    this.data.docApi =  this.locator.endpoints.DOC_API;
  }

}

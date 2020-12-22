import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BaseCtl } from '../base.component';
import { ServiceLocatorService } from '../service/service-locator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseCtl {

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(locator.endpoints.AUTH, locator, route);
  }

  ngOnInit() {
    this.form.data["loginId"] = "tm@nenosystems.com";
    this.form.data["password"] = "pass1234";
  }

  populateForm(form, data) {
    super.populateForm(form, data);
    form.data.loginId = data.loginId;
    form.data.password = data.password;
  }

  signIn() {
    var _self = this;

    console.log('signIn', this.form);

    let url = this.locator.endpoints.getEndpoint(this.locator.endpoints.AUTH, "login");

    this.locator.http.post(url, this.form.data, function (res, error) {

      if (error) {
        alert("Server Error:" + error);
        return;
      }

      console.log(res);
      _self.form.message = '';
      _self.form.inputerror = {};
      console.log("1");
      _self.form.error = !res.success;
      if (_self.locator.dataValidator.isNotNullObject(res.result.message)) {
        _self.form.message = res.result.message;
      }
      console.log("2");
      if (_self.locator.dataValidator.isNotNullObject(res.result.inputerror)) {
        _self.form.inputerror = res.result.inputerror;
      }

      console.log("3");

      if (_self.locator.dataValidator.isTrue(res.success)) {

        console.log("4");

        localStorage.setItem('loginId', res.result.data.loginId);
        localStorage.setItem('sessionId', res.result.jsessionid);

        console.log("0: userContext is set ", res.result.data);

        localStorage.setItem('userContext', JSON.stringify(res.result.data));
        localStorage.setItem('skey', res.result.data.skey);
        localStorage.setItem('appId', res.result.data.appId);

        console.log("1: userContext is set ", res.result.data);

        _self.locator.router.navigateByUrl('/dashboard');
      }
    });
  }





}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DataValidatorService } from './data-validator.service';

/**
 * Makes HTTP request web server for the application 
 */
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private router: Router,
    private httpClient: HttpClient,
    private dv: DataValidatorService) {
  }

  setSessionId(sid) {
  }

  /**
   * Check if user is not logged in then do not make any HTTP request
   */
  isLogout() {
    let loginId = localStorage.getItem('loginId');
    if ((loginId == "null" || loginId === null)
      && (this.router.url != "/login"
        && this.router.url != "/sessionOut"
        && this.router.url != "/logout"
        && this.router.url != "/fp"
        && this.router.url != "/admin"
      )) {
      this.router.navigateByUrl("/sessionOut");
      return true;
    } else {
      return false;
    }
  }

  /**
   * Get common HTTP request headers 
   */
  getHeader() {

    let skeystr = localStorage.getItem('skey');
    let appIdstr = localStorage.getItem('appId');

    let skey = "0";
    let appId = "0";

    if (this.dv.isNotNullObject(appIdstr)) {
      appId = appIdstr;
    }

    if (this.dv.isNotNullObject(skeystr)) {
      skey = skeystr;
    }

    let httpOptions = {
      headers: new HttpHeaders({
        "withCredentials": "true",
        "skey": skey,
        "appId": appId
      })
    };
    return httpOptions;
  }

  /**
   * Send HTTP GET request and call callback method after response is received. 
   * 
   * @param endpoint 
   * @param callback 
   */
  get(endpoint, callback) {
    if (this.isLogout()) {
      return true;
    }

    let sid = localStorage.getItem('sessionId');
    endpoint = endpoint + ";jsessionid=" + sid

    return this.httpClient.get(endpoint, this.getHeader()).subscribe(
      (data) => {
        callback(data);
      },
      (data) => {
        callback(data, true);
      }
    );;
  }

  /**
   * Send HTTP POST request and call callback method after response is received. 
   *
   * @param endpoint 
   * @param bean 
   * @param callback 
   */
  post(endpoint, bean, callback) {

    if (this.isLogout()) {
      return true;
    }

    let sid = localStorage.getItem('sessionId');
    endpoint = endpoint + ";jsessionid=" + sid

    return this.httpClient.post(endpoint, bean, this.getHeader()).subscribe((data) => {
      callback(data);
    }, (data) => {
      callback(data, true);
    });
  }


  /**
   * Send HTTP POST for multipart form data with attached file.
   * 
   * @param endpoint 
   * @param bean 
   * @param file 
   * @param callback 
   */
  postMutipart(endpoint, bean, file, callback) {
    if (this.isLogout()) {
      return true;
    }
    var fd = new FormData();
    fd.append('file', file);
    for (var key in bean) {
      if (bean.hasOwnProperty(key)) {
        console.log('Property -->', key, bean[key]);
        if (bean[key]) {
          fd.append(key, bean[key]);
        }
      }
    }

    let sid = localStorage.getItem('sessionId');
    endpoint = endpoint + ";jsessionid=" + sid

    return this.httpClient.post(endpoint, fd, this.getHeader()).subscribe((data) => {
      callback(data);
    }, (data) => {
      callback(data, true);
    });
  }
}

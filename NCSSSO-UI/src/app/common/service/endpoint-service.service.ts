import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EndpointServiceService {

  constructor() { }

  public SERVER_URL = "http://nenosystems.in:9095/NCSSSO";
  public DOC_API = "http://nenosystems.in:9097/NCSDOCS/api/doc/";
  //public SERVER_URL = "http://localhost:9095/NCSSSO";
  //public DOC_API = "http://localhost:9095/NCSSSO/api/doc/";
  public AUTH = this.SERVER_URL + "/auth";
  public USER = this.SERVER_URL + "/User";
  public APPLICATION = this.SERVER_URL + "/Application";
  public ORGANIZATION = this.SERVER_URL + "/Org";
  public MENU_ITEM = this.SERVER_URL + "/MenuItem";
  public ROLE_MENU_ITEM = this.SERVER_URL + "/RoleManuItem";
  public EXCEL = this.SERVER_URL + "/ExcelGen";
  public ROLE = this.SERVER_URL + "/Role";
  public SYSTEMSETTING = this.SERVER_URL + "/SystemSetting";
  public USERAPPLICATION = this.SERVER_URL + "/UserApplication";
  public MENUITEM = this.SERVER_URL + "/MenuItem";
  public ROLEMENUITEM = this.SERVER_URL + "/RoleManuItem";
  public getEndpoint(url: string, suburl: string) {
    return url + "/" + suburl;
  }

}

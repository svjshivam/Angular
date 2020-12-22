import { OnInit } from '@angular/core';
import { ServiceLocatorService } from './service/service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { BaseCtl } from './base.component' ;


/**
 * Contains method for List page 
 */
export class BaseListCtl extends BaseCtl {

  constructor(public endpoint: string,
    public locator: ServiceLocatorService,
    public route: ActivatedRoute) {
    super(endpoint, locator, route);
  }

  /**
  * Initialize component
  */
  ngOnInit() {
    this.preload();
    this.search();
  }

  /**
   * Deprecated 
   */
  display() {
    this.search();
  }

  /**
   * Deprecated
   */
  submit() {
    this.search();
  }

  //Delete a record from list and refresh the list data
  delete(id) {
    let _self = this;
    super.delete(id, function () {
      _self.search();
    });
  }

  /**
   * Save the record and execute search
   */
  save() {
    let _self = this;
    super.save(function(){
      _self.search();
    });
  }

  /**
   * Deprecated
   * @param id 
   * @param url 
   */
  edit(id, url) {
    if (!url) {
      url = "user";
    }
    let page = url + "/" + id;
    this.locator.forward(page);
  }

  /**
   * Go to next page of the list 
   */
  next() {
    this.form.pageNo++;
    if (this.form.pageCount == this.form.pageNo) {
      this.form.pageNo--;
    } else {
      this.display();
    }
  }

  /**
   * Go to previous page of the list 
   */
  previous() {
    if (this.form.pageNo > 0) {
      this.form.pageNo--
      this.display();
    }
  }

  //Returns list index number and current page      
  pageIndex(ind) {
    let i =  ind +1 + (this.form.pageNo*this.form.pageSize);
    return i;
  }

}

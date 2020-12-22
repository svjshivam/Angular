import { OnInit } from '@angular/core';
import { ServiceLocatorService } from './service/service-locator.service';
import { ActivatedRoute } from '@angular/router';

export class BaseCtl implements OnInit {

  public api = {
    endpoint: null,
    get: null,
    save: null,
    search: null,
    delete: null,
    preload: null
  }

  initApi(ep) {
    this.api.endpoint = ep;
    this.api.get = ep + "/get";
    this.api.save = ep + "/save";
    this.api.search = ep + "/search";
    this.api.delete = ep + "/delete";
    this.api.preload = ep + "/preload";
    console.log("API", this.api);
  }

  /**
   * Form contains preload data, error/sucess message 
   */
  public form = {
    error: false, //error 
    message: null, //error or success message
    preload: null, // preload data
    inputerror: {}, // form input error messages
    data: { id: null }, //form data
    searchParams: {}, //search form
    searchMessage: null, //search result message
    list: [], // search list 
    pageNo: 0,
    pageCount: 0,
    pageSize: 0,
    pageNoList: []
  };

  /**
   * Initialize services 
   * 
   * @param serviceLocator 
   * @param route 
   */
  constructor(public endpoint: string, public locator: ServiceLocatorService,
    public route: ActivatedRoute) {

    var _self = this;
    _self.initApi(endpoint);
    _self.form.data.id = 0;

    /**
     * Get primary key from path variale
     */
    locator.getPathVariable(route, function (params) {
      _self.form.data.id = params["id"];
      _self.get(_self.form.data.id);
    })
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.preload();
    if (this.form.data.id && this.form.data.id > 0) {
      //this.display();
    }
  }


  /**
   * Get record by primary key id and store in _self.form.data
   * @param id 
   */

  get(id) {

    var _self = this;
    _self.form.error = false;
    _self.form.message = "";
    _self.form.data =  { id: null };

    //console.log("Cleaned", _self.form.data);

    if (!id || id == 0) {
      return;
    }

    let url = _self.api.get + "/" + id;

    this.locator.http.get(url, function (res, error) {
      if (error) {
        alert(error);
        return;
      }

      if (res.success) {
        //_self.form.data.id = id;
        _self.populateForm(_self.form.data, res.result.data);
      } else {
        _self.form.error = true;
        _self.form.message = res.result.message;
      }
      console.log('FORM', _self.form);
    });

  }

  /**
   * Save this.form.data using post method
   */
  save(callback?) {
    var _self = this;
    _self.form.error = false;
    _self.form.message = "";
    _self.form.inputerror = {};

    this.locator.http.post(this.api.save, this.form.data, function (res, error) {
      if (error) {
        alert(error);
        return;
      }

      if (res.success) {
        _self.form.message = "Data is saved";
        if (callback) {
          callback();
        }
      } else {
        _self.form.error = true;
        _self.form.inputerror = res.result.inputerror;
        _self.form.message = res.result.message;
      }
      console.log('FORM', _self.form);
    });
  }

  validate() {
    return this.validateForm(this.form.data);
  }

  /**
   * Override by childs 
   * 
   * @param form 
   */
  validateForm(form) { }

  /**
   * Populate HTML form data
   * Overridden by child classes.
   * 
   * @param form 
   * @param data 
   */
  populateForm(form, data) {
    form.id = data.id;
  }

  /**
   * Loded preload data
   */
  preload() {
    var _self = this;
    _self.form.error = false;
    _self.form.message = "";

    this.locator.http.get(_self.api.preload, (res, error) => {
      if (error) {
        alert('Preload Error' + JSON.stringify(error));
        return;
      }

      if (res.success) {
        _self.form.preload = res.result;
      } else {
        _self.form.error = true;
        _self.form.message = res.result.message;
      }
      console.log('FORM', _self.form);
    });
  }

  /**
   * Searhs records 
   */
  search() {

    var _self = this;
    //_self.form.error = false;
    //_self.form.message = "";    

    console.log("Search Form", _self.form.searchParams);

    let url = _self.api.search + "/" + _self.form.pageNo;

    this.locator.http.post(url, _self.form.searchParams, function (res, error) {

      if (error) {
        alert(error);
        return;
      }

      if (res.success) {

        _self.form.list = res.result.data;
        _self.form.pageCount = res.result.pageCount;
        _self.form.pageSize = res.result.pageSize;
        _self.form.pageNoList = [];
        for (let i = 0; i < _self.form.pageCount; i++) {
          _self.form.pageNoList.push(i);
        }

        if (_self.form.list.length == 0) {
          _self.form.message = "No record found";
          _self.form.error = true;
        }

        console.log("List Size", _self.form.list.length);

      } else {
        _self.form.error = false;
        _self.form.message = res.result.message;
      }
      console.log('FORM', _self.form);
    });
  }


  /**
   * Contains display logic. It fetches data from database for the primary key 
   */
  display() {
    this.get(this.form.data.id);
  }

  /**
   * Contains submit logic. It saves data
   */
  submit() {
    this.save();
  }

  delete(id, callback?) {

    var _self = this;
    _self.form.error = false;
    _self.form.message = "";   

    let flag = confirm("Are you sure ?");
    if (!flag) {
      return;
    }

    this.locator.http.get(_self.api.delete + "/" + id, function (res, error) {

      if (error) {
        alert(error);
        return;
      }

      if (res.success) {
        _self.form.message = "Data is deleted";
        if (callback) {
          callback();
        }
      } else {
        _self.form.error = true;
        _self.form.message = res.result.message;
      }
    });
  }

  /**
   * Forward to page
   * @param page 
   */
  forward(page) {
    this.locator.forward(page);
  }

  /**
   * Get doc thumbnail
   * @param skey 
   */
  getDocThumbnail(skey) {
    if (!skey) {
      skey = 0;
    }
    return this.locator.endpoints.DOC_API + "th/"  + skey;
  }

  /**
   * Get application doc
   * @param skey 
   */
  getDoc(skey) {
    if (!skey) {
      skey = 0;
    }
    return this.locator.endpoints.DOC_API  + skey;
  }

  //Return refrence if current controller
  getSelf() {
    return this;
  }

}

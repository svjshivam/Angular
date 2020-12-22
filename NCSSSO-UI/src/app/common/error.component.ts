import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
  <strong *ngIf="form.error && form.message && form.message.trim().length>0" 
    style="color:red">
    <button class="btn btn-outline-danger btn-sm" >
      <i class="fas fa-times-circle"></i>
    </button>&nbsp;{{form.message}}
  </strong>
  <strong *ngIf="!form.error && form.message && form.message.trim().length>0" style="color:green">
    <button class="btn btn-outline-success btn-sm" >
      <i class="fas fa-check-circle"></i>
    </button>&nbsp;
    {{form.message}}
  </strong>
  `
})
export class ErrorComponent implements OnInit {

  @Input() message: string;
  @Input() error: boolean;
  @Input() form: {};

  constructor() { }
  ngOnInit() {
    console.log('------------------>');
  }

  reset() {
    this.error = false;
    this.message = "";
  }

}
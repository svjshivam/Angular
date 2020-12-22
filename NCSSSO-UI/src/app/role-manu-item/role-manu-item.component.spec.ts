import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManuItemComponent } from './role-manu-item.component';

describe('RoleManuItemComponent', () => {
  let component: RoleManuItemComponent;
  let fixture: ComponentFixture<RoleManuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleManuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

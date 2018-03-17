import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAtourComponent } from './add-edit-atour.component';

describe('AddEditAtourComponent', () => {
  let component: AddEditAtourComponent;
  let fixture: ComponentFixture<AddEditAtourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditAtourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAtourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

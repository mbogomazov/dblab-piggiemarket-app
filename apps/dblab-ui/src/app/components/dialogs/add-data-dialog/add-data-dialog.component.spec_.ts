import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataDialogComponent } from './add-data-dialog.component';

describe('AddDataDialogComponent', () => {
  let component: AddDataDialogComponent;
  let fixture: ComponentFixture<AddDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDataDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

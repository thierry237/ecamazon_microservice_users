import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GAddressComponent } from './g-address.component';

describe('GAddressComponent', () => {
  let component: GAddressComponent;
  let fixture: ComponentFixture<GAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

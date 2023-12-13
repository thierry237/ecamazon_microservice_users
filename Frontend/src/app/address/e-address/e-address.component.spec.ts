import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EAddressComponent } from './e-address.component';

describe('EAddressComponent', () => {
  let component: EAddressComponent;
  let fixture: ComponentFixture<EAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

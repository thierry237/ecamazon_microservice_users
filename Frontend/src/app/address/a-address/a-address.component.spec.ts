import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AAddressComponent } from './a-address.component';

describe('AAddressComponent', () => {
  let component: AAddressComponent;
  let fixture: ComponentFixture<AAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

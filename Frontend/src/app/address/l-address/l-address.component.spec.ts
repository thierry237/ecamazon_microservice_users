import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LAddressComponent } from './l-address.component';

describe('LAddressComponent', () => {
  let component: LAddressComponent;
  let fixture: ComponentFixture<LAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

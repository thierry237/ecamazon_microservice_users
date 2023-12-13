import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DAddressComponent } from './d-address.component';

describe('DAddressComponent', () => {
  let component: DAddressComponent;
  let fixture: ComponentFixture<DAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

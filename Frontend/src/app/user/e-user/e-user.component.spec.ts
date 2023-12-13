import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EUserComponent } from './e-user.component';

describe('EUserComponent', () => {
  let component: EUserComponent;
  let fixture: ComponentFixture<EUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

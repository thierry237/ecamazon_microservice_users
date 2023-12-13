import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DUserComponent } from './d-user.component';

describe('DUserComponent', () => {
  let component: DUserComponent;
  let fixture: ComponentFixture<DUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

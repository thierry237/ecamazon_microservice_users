import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LUserComponent } from './l-user.component';

describe('LUserComponent', () => {
  let component: LUserComponent;
  let fixture: ComponentFixture<LUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

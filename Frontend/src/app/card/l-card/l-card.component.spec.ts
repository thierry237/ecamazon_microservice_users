import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LCardComponent } from './l-card.component';

describe('LCardComponent', () => {
  let component: LCardComponent;
  let fixture: ComponentFixture<LCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

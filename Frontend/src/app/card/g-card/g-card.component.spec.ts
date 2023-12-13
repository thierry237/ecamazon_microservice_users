import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GCardComponent } from './g-card.component';

describe('GCardComponent', () => {
  let component: GCardComponent;
  let fixture: ComponentFixture<GCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

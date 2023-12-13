import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ACardComponent } from './a-card.component';

describe('ACardComponent', () => {
  let component: ACardComponent;
  let fixture: ComponentFixture<ACardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ACardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ACardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricDataEntryComponent } from './electric-data-entry.component';

describe('ElectricDataEntryComponent', () => {
  let component: ElectricDataEntryComponent;
  let fixture: ComponentFixture<ElectricDataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElectricDataEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectricDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

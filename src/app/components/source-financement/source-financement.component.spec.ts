import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceFinancementComponent } from './source-financement.component';

describe('SourceFinancementComponent', () => {
  let component: SourceFinancementComponent;
  let fixture: ComponentFixture<SourceFinancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SourceFinancementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SourceFinancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRegionsComponent } from './liste-regions.component';

describe('ListeRegionsComponent', () => {
  let component: ListeRegionsComponent;
  let fixture: ComponentFixture<ListeRegionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeRegionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

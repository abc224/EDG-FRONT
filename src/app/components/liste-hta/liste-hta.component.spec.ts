import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeHtaComponent } from './liste-hta.component';

describe('ListeHtaComponent', () => {
  let component: ListeHtaComponent;
  let fixture: ComponentFixture<ListeHtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeHtaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeHtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

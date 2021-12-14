import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioJudicialComponent } from './formulario-judicial.component';

describe('FormularioJudicialComponent', () => {
  let component: FormularioJudicialComponent;
  let fixture: ComponentFixture<FormularioJudicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioJudicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioJudicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

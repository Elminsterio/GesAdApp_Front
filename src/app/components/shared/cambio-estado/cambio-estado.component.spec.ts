import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioEstadoComponent } from './cambio-estado.component';

describe('CambioEstadoComponent', () => {
  let component: CambioEstadoComponent;
  let fixture: ComponentFixture<CambioEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambioEstadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

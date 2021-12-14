import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorDocumentosComponent } from './visor-documentos.component';

describe('VisorDocumentosComponent', () => {
  let component: VisorDocumentosComponent;
  let fixture: ComponentFixture<VisorDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisorDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisorDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

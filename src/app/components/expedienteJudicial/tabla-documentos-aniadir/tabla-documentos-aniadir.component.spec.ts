import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDocumentosAniadirComponent } from './tabla-documentos-aniadir.component';

describe('TablaDocumentosAniadirComponent', () => {
  let component: TablaDocumentosAniadirComponent;
  let fixture: ComponentFixture<TablaDocumentosAniadirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaDocumentosAniadirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaDocumentosAniadirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

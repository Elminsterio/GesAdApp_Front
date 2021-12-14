import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpedienteJudicialRoutingModule } from './expediente-judicial-routing.module';

import { CrearExpedienteComponent } from './crear-expediente/crear-expediente.component';
import { ExpedienteComponent } from './expediente/expediente.component';
import { FormularioJudicialComponent } from './formulario-judicial/formulario-judicial.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { HistorialComponent } from './historial/historial.component';
import { ResumenComponent } from './resumen/resumen.component';
import { IntervinientesComponent } from './intervinientes/intervinientes.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaExpedienteComponent } from './consulta-expediente/consulta-expediente.component';
import { NgOnDropDirective } from 'src/app/directives/ng-on-drop.directive';
import { TablaDocumentosAniadirComponent } from './tabla-documentos-aniadir/tabla-documentos-aniadir.component';
import { VencimientosComponent } from './vencimientos/vencimientos.component';




@NgModule({
  declarations: [

    CrearExpedienteComponent,
    FormularioJudicialComponent,
    DocumentosComponent,
    HistorialComponent,
    ResumenComponent,
    IntervinientesComponent,
    ExpedienteComponent,
    LoadingComponent,
    ConsultaExpedienteComponent,
    NgOnDropDirective,
    TablaDocumentosAniadirComponent,
    VencimientosComponent

  ],
  imports: [

    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ExpedienteJudicialRoutingModule
  ],
  exports: [

    CrearExpedienteComponent,
    FormularioJudicialComponent,
    DocumentosComponent,
    HistorialComponent,
    ResumenComponent,
    IntervinientesComponent,
    ExpedienteComponent,
    LoadingComponent

  ]
})
export class ExpedienteJudicialModule { }

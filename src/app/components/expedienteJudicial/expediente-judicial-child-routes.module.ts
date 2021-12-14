import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentosComponent } from './documentos/documentos.component';
import { FormularioJudicialComponent } from './formulario-judicial/formulario-judicial.component';
import { HistorialComponent } from './historial/historial.component';
import { ResumenComponent } from './resumen/resumen.component';
import { IntervinientesComponent } from './intervinientes/intervinientes.component';
import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { VencimientosComponent } from './vencimientos/vencimientos.component';

const ChildRoutes: Routes = [
  {path:'documentos', component: DocumentosComponent, canActivate: [AuthGuard] },
  {path:'ficha', component: FormularioJudicialComponent, canActivate: [AuthGuard] },
  {path:'historial', component: HistorialComponent, canActivate: [AuthGuard] },
  {path:'resumen', component: ResumenComponent, canActivate: [AuthGuard] },
  {path:'intervinientes', component: IntervinientesComponent, canActivate: [AuthGuard] },
  {path:'vencimientos', component: VencimientosComponent, canActivate: [AuthGuard] },
  {path: '**', redirectTo:'/dash-board', pathMatch: 'full'}
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ChildRoutes)],
  exports: [RouterModule]
})
export class ExpedienteJudicialChildRoutesModule { }

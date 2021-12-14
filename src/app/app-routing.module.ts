import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BoardComponent } from './components/board/board.component';
import { AuthGuard } from './guards/auth-guard.service';

import { PlantillasComponent } from './components/plantillas/plantilla/plantillas.component';
import { CrearExpedienteComponent } from './components/expedienteJudicial/crear-expediente/crear-expediente.component';
import { CrearClienteComponent } from './components/clientes/crear-cliente/crear-cliente.component';
import { ClienteComponent } from './components/clientes/cliente/cliente.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ConsultaClienteComponent } from './components/clientes/consulta-cliente/consulta-cliente.component';
import { ConsultaExpedienteComponent } from './components/expedienteJudicial/consulta-expediente/consulta-expediente.component';




const routes: Routes = [
  {
     path: 'expediente',
     loadChildren: () => import('./components/expedienteJudicial/expediente-judicial-routing.module')
                               .then(m => m.ExpedienteJudicialRoutingModule)
    }, 
  {path:'login'  , component: LoginComponent}, 
  {path:'dash-board'  , component: BoardComponent, canActivate: [AuthGuard]}, 
  {path:'creacion-expediente'  , component: CrearExpedienteComponent, canActivate: [AuthGuard]},
  {path:'consulta-expediente'  , component: ConsultaExpedienteComponent, canActivate: [AuthGuard]},
  {path:'consulta-cliente', component: ConsultaClienteComponent, canActivate: [AuthGuard]},
  {path:'creacion-cliente'  , component: CrearClienteComponent, canActivate: [AuthGuard]}, 
  {path:'cliente/:id'  , component: ClienteComponent, canActivate: [AuthGuard]}, 
  {path:'plantillas'  , component: PlantillasComponent, canActivate: [AuthGuard]}, 
  {path:'calendario'  , component: CalendarioComponent, canActivate: [AuthGuard]}, 
  {path: '**', redirectTo:'dash-board', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

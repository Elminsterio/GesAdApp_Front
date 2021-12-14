import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpedienteComponent } from './expediente/expediente.component';
import { AuthGuard } from 'src/app/guards/auth-guard.service';

const routes: Routes = [

  {path:':id'  , component: ExpedienteComponent,
   loadChildren: () => import('./expediente-judicial-child-routes.module').then(m => m.ExpedienteJudicialChildRoutesModule),
   canActivate: [AuthGuard]
   },
  {path: '**', redirectTo:'/dash-board', pathMatch: 'full'}

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpedienteJudicialRoutingModule { }

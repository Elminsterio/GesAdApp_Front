import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { BoardComponent } from './components/board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { PlantillasComponent } from './components/plantillas/plantilla/plantillas.component';
import { VisorDocumentosComponent } from './components/shared/visor-documentos/visor-documentos.component';
import { CrearClienteComponent } from './components/clientes/crear-cliente/crear-cliente.component';
import { CambioEstadoComponent } from './components/shared/cambio-estado/cambio-estado.component';
import { ClienteComponent } from './components/clientes/cliente/cliente.component';
import { DialogPlantillaComponent } from './components/plantillas/dialog-plantilla/dialog-plantilla.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ExpedienteJudicialModule } from './components/expedienteJudicial/expediente-judicial.module';
import { ConsultaClienteComponent } from './components/clientes/consulta-cliente/consulta-cliente.component';
import { SinResultadosComponent } from './components/shared/sin-resultados/sin-resultados.component';



@NgModule({
  declarations: [

    AppComponent,
    NavbarComponent,
    LoginComponent,
    BoardComponent,
    SafeUrlPipe,
    PlantillasComponent,
    VisorDocumentosComponent,
    CrearClienteComponent,
    CambioEstadoComponent,
    ClienteComponent,
    DialogPlantillaComponent,
    CalendarioComponent,
    ConsultaClienteComponent,
    SinResultadosComponent

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    ExpedienteJudicialModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
      return localStorage.getItem('access_token');
        },
        allowedDomains: ['localhost:3000']
    }
  }),
    BrowserAnimationsModule

  ],
  exports: [

    BrowserModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

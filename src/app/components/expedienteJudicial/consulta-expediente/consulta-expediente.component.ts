import { Component, OnInit } from '@angular/core';
import { DataJudicialService } from 'src/app/services/data-judicial.service';
import { Cliente } from 'src/app/models/cliente.model';
import { ServerRequestsService } from 'src/app/services/server-requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-expediente',
  templateUrl: './consulta-expediente.component.html',
  styleUrls: ['./consulta-expediente.component.css']
})
export class ConsultaExpedienteComponent implements OnInit {

  expedientes: object = [];
  expedientesBuscados: object = [];

  constructor( public _dj: DataJudicialService,
               public _rs: ServerRequestsService,
               private router: Router) { 

    this._rs.getExpedientes()
            .subscribe(res => { this.expedientes = res['expediente'], this.expedientesBuscados = res['expediente'], console.log(this.expedientes); })

  }
  
  aExpediente(id: string) {
    this.router.navigate(['/expediente', id, 'resumen'])
  }

  ngOnInit(): void {

  }

}

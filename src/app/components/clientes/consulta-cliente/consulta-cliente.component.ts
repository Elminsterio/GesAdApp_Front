import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { DataJudicialService } from 'src/app/services/data-judicial.service';
import { ServerRequestsService } from 'src/app/services/server-requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css']
})
export class ConsultaClienteComponent implements OnInit {

  clientes = [];
  clientesBuscados: Cliente[];

  constructor( public _dj: DataJudicialService,
               public _rs: ServerRequestsService,
               private router: Router) { 

    this._rs.getClientes()
            .subscribe(res => {this.clientes = res, this.clientesBuscados = [...res]
            console.log(this.clientes, this.clientesBuscados);} )

  }
  
  buscar(termino, clientes, clientesBuscados) {
  
    this.clientesBuscados = this._dj.buscarConResultados(termino, clientes, clientesBuscados)

  }
  
  aCliente(id: string) {
    this.router.navigate(['cliente', id])
  }

  ngOnInit(): void {

  }

}

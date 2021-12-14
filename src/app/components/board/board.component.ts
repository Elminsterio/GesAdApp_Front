import { Component, OnInit } from '@angular/core';
import { ServerRequestsService } from 'src/app/services/server-requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  
  clientesActuales: any;
  expedientesActuales: any;

  constructor( public _sr: ServerRequestsService,
               private route: Router ) { 

    this._sr.getClientes()
            .subscribe(clientes => {
              this.clientesActuales = clientes;
            });

    this._sr.getExpedientes()
            .subscribe(expedientes => {
              this.expedientesActuales = expedientes['expediente']; console.log(expedientes);
            });
  }

  verExpediente(id) {
      
    this.route.navigate(['/expediente/', id, 'resumen'])

  }

  verCliente(id) {

    this.route.navigate(['/cliente/', id])

  }

  ngOnInit(): void {

  }



}

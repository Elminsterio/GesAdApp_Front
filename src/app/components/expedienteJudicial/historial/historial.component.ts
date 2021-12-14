import { Component, OnInit } from '@angular/core';
import { ServerRequestsService } from 'src/app/services/server-requests.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  add = false;
  id: string;
  expediente: object;
  comentario: string;

  constructor( private _sr: ServerRequestsService,
               private ar: ActivatedRoute) {

              this.id = this.ar.parent.snapshot.paramMap.get('id');

   }

  ngOnInit(): void {

    this._sr.getExpediente(this.id)
            .subscribe((expediente) => {
              this.expediente = expediente['expediente'];
              console.log(this.expediente);

    })
  }

  enviarComentario() {
    console.log(this.comentario);
    this._sr.introducirComentarioExpediente(this.id, this.comentario)
            .subscribe(resp => { console.log(resp), this.add = !this.add });

    

    }
}



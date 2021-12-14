import { Component, OnInit } from '@angular/core';
import { ServerRequestsService } from 'src/app/services/server-requests.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataJudicialService } from 'src/app/services/data-judicial.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  forma: FormGroup;
  expediente: object;
  estados: string[];
  id: string;
  
  constructor( public _rs: ServerRequestsService,
               public _dj: DataJudicialService,
               private ar: ActivatedRoute ) { 

    this.id = this.ar.parent.snapshot.paramMap.get('id');
    

    this.estados = this._dj.tiposEstado;
    console.log(this.estados);
    this._rs.getExpediente(this.id)
            .subscribe((expediente) => {
              this.expediente = expediente['expediente'];
            })

  }

  ngOnInit(): void {

  }

}

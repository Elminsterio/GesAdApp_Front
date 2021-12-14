import { Component, OnInit, Input } from '@angular/core';
import { documentoModel } from 'src/app/models/documento.model';
import { DataJudicialService } from 'src/app/services/data-judicial.service';
import { ServerRequestsService } from 'src/app/services/server-requests.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tabla-documentos-aniadir',
  templateUrl: './tabla-documentos-aniadir.component.html',
  styleUrls: ['./tabla-documentos-aniadir.component.css']
})
export class TablaDocumentosAniadirComponent implements OnInit {

  @Input() archivos: documentoModel[];
  @Input() expediente: object;

  descripcion: string[] = [''];
  tipo: string[] = [];

  vencimiento: boolean[] = [];
  plazo: string[] = [];
  conteo: number[] = [];

  costas: boolean[] = [];

  constructor(public _dj: DataJudicialService,
              public _rs: ServerRequestsService,
              private _snackBar: MatSnackBar ) {  }

  cargarArchivo(archivo, tipo, descripcion, indice) {
    
    if(!descripcion) {
      descripcion = "";
    }
    
    let formData = new FormData();
    formData.append('archivo', archivo['archivo']);
    formData.append('descripcion', descripcion);
    formData.append('tipo', tipo);
    

    this._rs.cargarArchivo('documentos', this.expediente['_id'], formData)
            .subscribe(res => console.log(res['documento'], this.expediente['documentos'].unshift(res['documento'])))
    
    this.archivos.splice(indice, 1);
    this.vencimiento.splice(indice, 1);
    this.plazo.splice(indice, 1);
    this.conteo.splice(indice, 1);
    this.costas.splice(indice, 1);
    this.descripcion.splice(indice, 1);
    this.tipo.splice(indice, 1);


    this._snackBar.open('Archivo creado', 'X', {
      duration: 2000,
    })

  }

  limpiarArchivos(indice) {

    this.archivos.splice(indice, 1);
    this.vencimiento.splice(indice, 1);
    this.plazo.splice(indice, 1);
    this.conteo.splice(indice, 1);
    this.costas.splice(indice, 1);
    this.descripcion.splice(indice, 1);
    this.tipo.splice(indice, 1);

    
  }

  ngOnInit(): void {
  }

}

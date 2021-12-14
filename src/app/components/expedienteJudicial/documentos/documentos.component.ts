import { Component, OnInit, Input } from '@angular/core';
import { documentoModel } from 'src/app/models/documento.model';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ServerRequestsService } from 'src/app/services/server-requests.service';
import { ActivatedRoute } from '@angular/router';
import { VisorDocumentosComponent } from '../../shared/visor-documentos/visor-documentos.component';
import { DataJudicialService } from 'src/app/services/data-judicial.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  id: string;
  expediente: object;
  archivos: documentoModel[] = [];
  descripcion: string[] = [''];
  tipo: string[] = [];
  plantillas: object[] = [];

  add: boolean = false;
  estaSobreDrop: boolean = false;
  


  constructor( public _rs: ServerRequestsService,
               private ar: ActivatedRoute,
               public dialog: MatDialog) {

                this.id = this.ar.parent.snapshot.paramMap.get('id');

                this._rs.getTemplates()
                        .subscribe(res => this.plantillas = res)

                this._rs.getExpediente(this.id)
                        .subscribe((expediente) => {
                          this.expediente = expediente['expediente']
                          console.log(this.expediente)})
                                    
                }

  eliminarArchivo(id, idExpediente) {

    this._rs.estasSeguro().then((result) => {
      /* Read more about isConfirmed, isDenied below */
      console.log(result);
      if (result.isConfirmed) {
        
        this._rs.eliminarArchivo(id, idExpediente, 'documentos')
                .subscribe(res => {
                  this._rs.getExpedienteDocs(this.id)
                          .subscribe((expediente) => {
                            this.expediente = expediente['expediente']
                            console.log(this.expediente)})
                })
                        
      } else if (result.isDenied) {
         return;
      }

    })

    this._rs.getExpedienteDocs(this.id)
                .subscribe((expediente) => {
                  this.expediente = expediente['expediente']
                  console.log(this.expediente)})
      
   
  }

  subirArchivoA(files: FileList) {
    
    for(let propiedad in Object.keys(files)) {
  
      const archivoTemporal = files[propiedad];
      console.log(archivoTemporal);
      const nuevoArchivo = new documentoModel( archivoTemporal );
      this.archivos.push( nuevoArchivo );

    }
  }
  
  verArchivo(nombre: string) {
    this._rs.getArchivo('documentos', this.id, nombre )
            .subscribe(documentoBlob => {
              const dialogRef = this.dialog.open(VisorDocumentosComponent, {
                data: {documentoBlob}
            });
          
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed', result);
              });
            }
          )


  }

  descargar(nombre: string) {

    this._rs.getArchivo('documentos', this.id, nombre )
            .subscribe(documento => {
              const url= window.URL.createObjectURL(documento);
              window.open(url);

            });  

  }

  generar(id: string, datos: object, idPlantilla: string) {

    this._rs.generarTemplate(id, datos, idPlantilla)
            .subscribe(res => console.log(res))

  }
  
  ngOnInit(): void {

  }
}


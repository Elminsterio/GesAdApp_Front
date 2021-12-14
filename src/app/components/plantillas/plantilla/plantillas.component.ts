import { Component, OnInit } from '@angular/core';
import { ServerRequestsService } from 'src/app/services/server-requests.service';
import { MatDialog } from '@angular/material/dialog';

import { DialogPlantillaComponent } from '../dialog-plantilla/dialog-plantilla.component';


@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.css']
})
export class PlantillasComponent implements OnInit {

  plantillas: object[];
  plantillaFile: object;

  constructor(private _sr: ServerRequestsService,
              private dialog: MatDialog) { 
    
    this._sr.getTemplates()
    .subscribe(plantillas => {
      console.log(plantillas);
      this.plantillas = plantillas;
    })
  }

  AnadirPlantilla() {
    const dialogRef = this.dialog.open(DialogPlantillaComponent, {
      height: '75%',
      width: '600px',
      data: {plantillaFile: {}, descripcion: '', titulo: ''}
    })
      dialogRef.afterClosed().subscribe(result => {

        if(!result) {
          return;
        }

        console.log('The dialog was closed', result);

        let formData: FormData = new FormData;

        formData.append('titulo', result.titulo);
        formData.append('descripcion', result.descripcion);
        formData.append('archivo', result.plantillaFile);

        this._sr.subirTemplate(formData)
                .subscribe(res => console.log(res))

      });
  };

  eliminarPlantilla(id: string, index: number) {
    console.log(id);
    this._sr.deleteTemplates(id)
            .subscribe(res => {
              console.log(res);
              this.plantillas.splice(index, 1);

            })
  
    
  }


  ngOnInit(): void {
  }


}

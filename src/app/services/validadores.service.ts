import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServerRequestsService } from './server-requests.service';



@Injectable({
  providedIn: 'root'
})

export class ValidadoresService {

  constructor( private _rs:ServerRequestsService ) { }

  validarCampoObjeto(DocAValidar: string) {
    

    return (formGroup: FormGroup) => {
  
    let campoAValidar = formGroup.controls[DocAValidar].value;

    this._rs.getClientes()
            .subscribe(res => {
            
              if(res.some(element => element[DocAValidar] === campoAValidar)) {
                return formGroup.controls[DocAValidar].setErrors({yaExiste: true})
              }
            })
    }
  }

}

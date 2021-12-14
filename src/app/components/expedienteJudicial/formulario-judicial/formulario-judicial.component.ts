import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerRequestsService } from 'src/app/services/server-requests.service';
import { ActivatedRoute } from '@angular/router';
import { expedienteJudicial } from '../../../models/expedienteJudicial.model'


@Component({
  selector: 'app-formulario-judicial',
  templateUrl: './formulario-judicial.component.html',
  styleUrls: ['./formulario-judicial.component.css']
})
export class FormularioJudicialComponent implements OnInit {

  public forma: FormGroup;
  id: string;
  expediente: object;

  constructor( private formBuilder: FormBuilder,
               private _sr: ServerRequestsService,
               private ar: ActivatedRoute ) { 
    
    this.id = this.ar.parent.snapshot.paramMap.get('id');

    this.crearFormulario();

    this._sr.getExpediente(this.id)
            .subscribe((expediente) => {
              this.expediente = expediente['expediente'];
              console.log(this.expediente);
              this.cargarDataAlFormulario()
             
        })


      }


  ngOnInit(): void {
  }

  get tipoProcedimientoNoValido() {
    return this.forma.get('tipo').invalid && this.forma.get('tipo').touched
  }

  
  crearFormulario() {

    this.forma = this.formBuilder.group({
      juzgado: ['', [Validators.required]],
      numero: [''],
      partido: [''],
      direccion: [''],
      tipo: ['', [Validators.required]],
      autos: [''],
    });

  }

  cargarDataAlFormulario() {

    this.forma.setValue({
      juzgado: this.expediente['juzgado'],
      numero: this.expediente['numeroJuzgado'],
      partido: this.expediente['partido'],
      direccion: this.expediente['direccionJuzgado'],
      tipo: this.expediente['tipoProcedimiento'],
      autos: this.expediente['autos']
    });

  }


  Submit() {

   if(this.forma.invalid) {
     return;
   }
    console.log(this.forma);

   const controls = this.forma.controls;

   const data = new expedienteJudicial (

    controls.juzgado.value,
    controls.numero.value,
    controls.partido.value,
    controls.direccion.value,
    controls.tipo.value,
    controls.autos.value,

   )
  
   console.log(data);

   this._sr.modificarDatosExpediente(this.id, data)
           .subscribe(dataregreso => console.log(dataregreso))

  }

}

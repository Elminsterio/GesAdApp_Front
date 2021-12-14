import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { ServerRequestsService } from 'src/app/services/server-requests.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})

export class CrearClienteComponent implements OnInit {

  forma: FormGroup;
  avance = '';

  constructor( public fb: FormBuilder,
               private _rs: ServerRequestsService,
               private router: Router,
               private validadores: ValidadoresService ) { 

    this.crearFormulario();

    console.log(this.forma);
    
  }

  validarCampo(campo: string) {

    if(this.forma.controls[campo]['yaExiste'] !== true) {
      return true
    } else {
      return false
    }

  }

  get DocIdentificacionNoValido() {
    return this.forma.get('DocIdentificacion').invalid && this.forma.get('DocIdentificacion').touched
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidosNoValido() {
    return this.forma.get('apellidos').invalid && this.forma.get('apellidos').touched
  }

  get emailNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }
  
  get domiciliolNoValido() {
    return this.forma.get('domicilio').invalid && this.forma.get('domicilio').touched
  }

  crearFormulario() {

    this.forma = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      DocIdentificacion: ['', [ Validators.pattern(/\d{8}[A-Z]/), Validators.required ]],
      nacionalidad: [''],
      domicilio: ['', [Validators.required]],
      telefono: [''],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]]

    },
    {
      validators: [this.validadores.validarCampoObjeto('DocIdentificacion'), this.validadores.validarCampoObjeto('email')]
    });

  }

  avanzarPlantilla(avanceRetro: boolean) {

    const continuar = ['', 'identificacion', 'contacto']
    
    if(avanceRetro) {

      let i = continuar.indexOf(this.avance);

      this.avance = continuar[i + 1]

    }

    if(!avanceRetro) {

      let i = continuar.indexOf(this.avance);

        this.avance = continuar[i - 1]

    }
  }
  
  submit() {
   console.log(this.forma);

   if(this.forma.invalid) {
     return;
   }
  
   const controls = this.forma.controls;
    
   const data = new Cliente (

    controls.nombre.value, 
    controls.apellidos.value, 
    controls.DocIdentificacion.value, 
    controls.nacionalidad.value, 
    controls.telefono.value, 
    controls.domicilio.value, 
    controls.email.value

   )
  
   Swal.showLoading();

   this._rs.crearCliente( data )
           .subscribe(
            resp => {

              Swal.fire({
                text: 'El cliente se ha creado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              })

              this.router.navigateByUrl('/board');

            },
            err => {
              Swal.fire({
                title: 'Error',
                text: 'Prueba a intentarlo más tarde',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })

              this.router.navigateByUrl('/board');
            })

  }



  ngOnInit(): void {

  }

}

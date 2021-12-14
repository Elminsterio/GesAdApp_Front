import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ServerRequestsService } from 'src/app/services/server-requests.service';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})



export class ClienteComponent implements OnInit {
  
  id;
  forma: FormGroup;
  cliente: object;

  constructor( private formBuilder: FormBuilder,
               private _sr: ServerRequestsService,
               public ar: ActivatedRoute) {
    
    this.id = this.ar.snapshot.params.id;
    console.log(this.id);
    this.crearFormulario()
    this._sr.getCliente(this.id)
            .subscribe(cliente => {
              this.cliente = cliente;
              console.log(cliente);
              this.cargarDataAlFormulario()})

   }

   crearFormulario() {

    this.forma = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      DocIdentificacion: [{ value: '', disabled: true }],
      nacionalidad: [''],
      telefono: [''],
      domicilio: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });

  }

  cargarDataAlFormulario() {

    this.forma.setValue({
      nombre: this.cliente['nombre'],
      apellidos: this.cliente['apellidos'],
      DocIdentificacion: this.cliente['DocIdentificacion'],
      nacionalidad: this.cliente['nacionalidad'] || '',
      domicilio: this.cliente['domicilio'],
      telefono: this.cliente['telefono'] || '',
      email: this.cliente['email']
    });
  }
    
  Submit() {
            
  if(this.forma.invalid) {
    return;
  }
  
  console.log(this.forma);

  const controls = this.forma.controls;

  let data = new Cliente (

   controls.nombre.value,
   controls.apellidos.value,
   controls.DocIdentificacion.value,
   controls.nacionalidad.value,
   controls.telefono.value,
   controls.domicilio.value,
   controls.email.value,


  )
  console.log(data);
  this._sr.modificarCliente(this.id, data)
          .subscribe(resp => console.log(resp))

}
        
    ngOnInit(): void {
          
    }

}

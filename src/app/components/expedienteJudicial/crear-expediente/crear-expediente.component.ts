import { Component, OnInit } from '@angular/core';
import { ServerRequestsService } from 'src/app/services/server-requests.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataJudicialService } from 'src/app/services/data-judicial.service';
import { Contrarios } from 'src/app/models/contrario.model';
import { Cliente } from 'src/app/models/cliente.model';
import { expedienteJudicial } from 'src/app/models/expedienteJudicial.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-expediente',
  templateUrl: './crear-expediente.component.html',
  styleUrls: ['./crear-expediente.component.css']
})


export class CrearExpedienteComponent implements OnInit {

  avance: string;
  forma: FormGroup;
  formaC: FormGroup;


  clientes = [] || {};
  clientesBuscados: Cliente[] = [];
  clientesAnadidos: Cliente[] = [];

  contrarios = [] || {};
  contrariosBuscados = [];
  contrariosAnadidos = [];

  demandante: string;
  demandado: string;
  esDemandante: boolean = true;

  enTribunal = false;

  constructor( private _sr: ServerRequestsService,
               public _dj: DataJudicialService,
               public fb: FormBuilder,
               public router: Router) { 

    this._sr.getClientes()
            .subscribe(res => this.clientes = res );
    
    this._sr.getContrarios()
            .subscribe(res => this.contrarios = res );

    this.crearFormulario();
    this.crearFormularioC();
  }

  crearFormulario() {
  
    this.forma = this.fb.group({

      orden: ['', [Validators.required]],
      materia: ['', [Validators.required]],
      juzgado: [''],
      num: [''],
      lugar: [''],
      direccion: [''],
      procedimiento: [''],
      autos: [''],
      resumen: ['', [Validators.required]]

    });

  }

  crearFormularioC() {

    this.formaC = this.fb.group({

      nombreC: ['', [Validators.required]],
      apellidosC: ['', [Validators.required]],
      DocIdentificacionC: ['', [Validators.required]],
      domicilioC: ['', [Validators.required]],
      telefonoC: [''],
      emailC: ['', [Validators.required]]

    });

  }



  aniadir( Seleccionado, Buscados, Anadidos ) { 

    if( !Anadidos.some(cl => cl._id == Seleccionado._id)) {

      Anadidos.push(Seleccionado);

      Buscados.length = 0;

    }
    
    return;

  }

  subirContrario(  ) {
    
    console.log(this.formaC);

    if(this.formaC.invalid) {
      return;
    }

   let contrario = new Contrarios (
    
    this.formaC.value.nombreC,
    this.formaC.value.apellidosC,
    this.formaC.value.DocIdentificacionC,
    this.formaC.value.telefonoC,
    this.formaC.value.domicilioC,
    this.formaC.value.emailC

   )

   this._sr.crearContrario( contrario )
           .subscribe(res => {
            this._sr.getContrarios()
            .subscribe(resCont => this.contrarios = resCont );
            console.log(res);
           })

  }

  deseleccionar( idx ) {
    
    this.clientesAnadidos.splice( idx, 1 );

    this.clientesBuscados.length = 0;

  }
  
  deseleccionarC( idx ) {
    
    this.contrariosAnadidos.splice( idx, 1 );

    this.contrariosBuscados.length = 0;

  }


  submit() {
    
    if (this.forma.invalid) {
          return;
        }

    // Añade en un array los ID de clientes y contrarios.

    function ArrId( objectArray ) {

      let arr = []
      
      for(let i = 0; i < objectArray.length; i++) {

        arr.push(objectArray[i]._id) 
      }
      return arr;
    }
    
    let expediente = new expedienteJudicial (

      ArrId(this.clientesAnadidos),
      ArrId(this.contrariosAnadidos), 
      this.forma.value.procedimiento,
      this.forma.value.resumen, 
      this.enTribunal, 
      this.forma.value.orden, 
      this.esDemandante,
      this.forma.value.juzgado, 
      this.forma.value.num, 
      this.forma.value.lugar, 
      this.forma.value.direccion, 
      this.forma.value.autos

      )
    
    Swal.fire({
        allowOutsideClick: false,
        text: 'Espere por favor...'
      });

    Swal.showLoading();

    this._sr.crearExpediente( expediente )
            .subscribe(  
            resp => {

              Swal.fire({
                text: 'El expediente se ha creado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              })

              this.router.navigateByUrl('/board');

            },
            err => {
              Swal.fire({
                title: 'Error',
                text: 'prueba a intentarlo más tarde',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })

              this.router.navigateByUrl('/board');
            })
  }
  
  
  // Avance y retroceso de plantilla:

  avanzarPlantilla(avanceRetro: boolean) {

    let continuar = ['orden', 'materia', 'contrarios', 'judicializado', 'resumen']
    
    if(avanceRetro) {

      let i = continuar.indexOf(this.avance);

      this.avance = continuar[i + 1]

    }

    if(!avanceRetro) {

      let i = continuar.indexOf(this.avance);

        this.avance = continuar[i - 1]

    }
    
    this.posicionJuridica();

  }

  posicionJuridica() {
      
    switch (this.forma.value.orden) {

      case 'Civil' || 'Contencioso-Administrativo':

      this.demandante = 'Demandante';
      this.demandado = 'Demandado';
      
      break;

      case 'Laboral':

      this.demandante = 'Demandante';
      this.demandado = 'Demandado';

      break;

      case 'Penal' || 'Militar':

      this.demandante = 'Querellante/denunciante';
      this.demandado = 'Querellado/denunciado';

      break;

      case 'Jurisdicción Voluntaria':

      this.demandante = 'Solicitante';
      this.demandado = 'Solicitado';

      break;

    }
  }
  
  noJudicializado() {

    this.enTribunal = false;
    this.forma.controls.procedimiento.setValue('');
    this.forma.controls.juzgado.setValue('');
    this.forma.controls.num.setValue('');
    this.forma.controls.lugar.setValue('');
    this.forma.controls.direccion.setValue('');
    this.forma.controls.autos.setValue('');
    this.esDemandante = true;
  }

  ngOnInit(): void {

  }

}

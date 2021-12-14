import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { usuarioModel } from '../models/usuario.model';
import { JwtHelperService } from '@auth0/angular-jwt';

import Swal from 'sweetalert2';
import { Cliente } from '../models/cliente.model';
import { Contrarios } from '../models/contrario.model';
import { expedienteJudicial } from '../models/expedienteJudicial.model';




@Injectable({
  providedIn: 'root'
})

export class ServerRequestsService {

  host: string = 'http://localhost:3000';
  expediente: string = '/expediente';
  usuario: string = '/usuario';
  logeo: string = '/login';
  

  tokenUsuario: string;
  tokenDecodificado: object;
  urlImg:string;

  constructor( private http: HttpClient,
               public jwtHelper: JwtHelperService ) { 
    
  }
  

   // headers incluyendo Token
    
  options() {
    return {
    headers: {
    'Authorization': this.tokenUsuario
      }
    }
  }  

  login( usuario: usuarioModel) {
      
    return this.http.post(this.host + this.logeo, usuario) 
                    .pipe(
                      map( resp => {
                        this.guardarToken( resp['token'] )
                        return resp;
                      })
                    )

  }

  getArchivo(tipo: string, id: string, documento: string) {
    
    return this.http.get( `${ this.host }/archivo/${ tipo }/${ id }/${ documento }`,  { responseType: 'blob' as 'json' } ) 

  }
  
  eliminarArchivo(id, idExpediente, tipo) {


    return this.http.delete(`${ this.host }/documentos/${ tipo }/${ idExpediente }/${ id }`, this.options())

  }

  cargarArchivo(tipo: string, id: string, archivo: FormData) {

    return this.http.put( `${ this.host }/upload/${ tipo }/${ id }`, archivo, this.options())

  }

  crearCliente(datos: Cliente) {
    
    return this.http.post( `${ this.host }/cliente`, datos, this.options() )

  }

  getClientes() {

    return this.http.get( this.host + '/cliente', this.options() )
                    .pipe(
                      map( res => res['clientes'] )
                    )
 
  }

  // busquedaDeClientes(cliente: string) {

    // let clientesArr = [];
    // cliente = cliente.toLowerCase();

    //for( let i = 0; i < this.clientes.length; i ++ ){

     // let cliente = this.heroes[i];

     // let nombre = heroe.nombre.toLowerCase();

    //  if( nombre.indexOf( termino ) >= 0  ){
     //   heroe.idx = i;
     //   heroesArr.push( heroe )
    //  }

  //  }

//    return clientesArr;

//  }


  getCliente(id: string) {

    return this.http.get( this.host + '/cliente/' + id, this.options() )
                    .pipe(map(res => res['cliente']))

  }

  modificarCliente(id: string, datos: object) {

    return this.http.put( this.host + '/cliente/' + id, datos, this.options())

  }

  getExpedientes() {
    
    return this.http.get( this.host + '/expediente', this.options() )
 
  }

  getExpediente(id) {

    return this.http.get( this.host + '/expediente/' + id, this.options() )

  }

  getExpedienteDocs(id) {
    
    return this.http.get( this.host + '/expedienteDoc/' + id, this.options() )

  }

  crearExpediente(datos: expedienteJudicial) {

    return this.http.post( this.host + '/expediente', datos, this.options() )
    
  }
  
  introducirComentarioExpediente(id, comentario) {

    return this.http.put( this.host + '/comentario/expediente/' + id, {comentario}, this.options())


  }

  modificarDatosExpediente(id, datos) {

    return this.http.put( this.host + '/expediente/' + id, datos, this.options())

  }

  generarTemplate(id, datos, idPlantilla) {

     return this.http.put( this.host + '/template/' + idPlantilla + '/' + id, datos, this.options())

  }

  subirTemplate(plantilla: FormData) {

    let header = new HttpHeaders();
    header = header.append('Authorization', this.tokenUsuario);

    return this.http.put( this.host + '/upload/template/1', plantilla, { headers: header } )

  }

  getTemplates() {

    return this.http.get( this.host + '/template', this.options() )
                    .pipe(map(res => res['plantilla']))

  }
  
  deleteTemplates( id ) {

    return this.http.delete( this.host + /template/ + id, this.options() )

  }

  // Para CRUD datos de contrario.

  crearContrario( datos: Contrarios ) {
    
    return this.http.post( this.host + '/contrario', datos, this.options() )

  }


  getContrarios() {
    
    return this.http.get( this.host + '/contrario', this.options() )
                    .pipe(map(res => res['contrarios']))

 
  }


  // Para lo referente al Token.


  guardarToken(Authorization: string) {
  
    this.tokenUsuario = Authorization;
    localStorage.setItem('Authorization', Authorization);

  }

  
  leerToken() {
    
    if ( localStorage.getItem('Authorization')) {

      this.tokenUsuario = localStorage.getItem('Authorization');

    } else {

      this.tokenUsuario = '';

    }
    
   return this.tokenUsuario
    
  }
  
  decodificarToken(token) {

    return this.jwtHelper.decodeToken(token)

  }

  // Seguridad

  estaAutenticado() {
    
    this.leerToken()

    if ( this.tokenUsuario.length < 2 || !this.tokenUsuario) {
      return false 
    }
      this.tokenDecodificado = this.decodificarToken(this.leerToken())
      this.urlImg = `${this.host}/archivo/usuarios/${this.tokenDecodificado['usuario']._id}/${this.tokenDecodificado['usuario'].img}`;
      return !this.jwtHelper.isTokenExpired(this.tokenUsuario)

    }
  
    // Para aceptar eliminaciones.
    
    estasSeguro() {

      return Swal.fire({
        title: '¿Estás seguro?',
        showDenyButton: true,
        confirmButtonText: `Aceptar`,
        denyButtonText: `Cancelar`,
      })

    }


  }




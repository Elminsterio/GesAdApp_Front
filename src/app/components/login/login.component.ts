import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { usuarioModel } from '../../models/usuario.model';
import { ServerRequestsService } from '../../services/server-requests.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: usuarioModel = new usuarioModel;
  recordarme = false;

  constructor( private _sr: ServerRequestsService,
               private router: Router ) { }

  ngOnInit(): void {
    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login( form: NgForm ) {

    if(form.invalid) {return;}

    Swal.fire({
      allowOutsideClick: false,
      title: 'info',
      text: 'Espere por favor...'
    });
    
    Swal.showLoading();

    this._sr.login(this.usuario)
            .subscribe(
              
            resp => {

              Swal.close();

              if ( this.recordarme ) {
              localStorage.setItem('email', this.usuario.email);
              }

              this.router.navigateByUrl('/board');

            },
            err => {
              Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
            });

    

  }
}

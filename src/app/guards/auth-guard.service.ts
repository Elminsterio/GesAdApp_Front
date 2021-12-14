import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ServerRequestsService } from '../services/server-requests.service';



@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor( private _sr: ServerRequestsService,
               private router: Router) {}

  canActivate(): boolean  {

    if ( this._sr.estaAutenticado() ) {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
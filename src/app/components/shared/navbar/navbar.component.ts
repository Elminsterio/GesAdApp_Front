import { Component, OnInit } from '@angular/core';
import { ServerRequestsService } from '../../../services/server-requests.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit   {

  tokenDecodificado: object;
  urlImg: string;
  imgCargada = false;

  constructor( public _sr: ServerRequestsService,
               private router: Router) { 
                 
                 if(!this._sr.estaAutenticado()) {
               
                   console.log(this.urlImg);
                   this.router.navigate(['/login'])
               
                 
               } 
            

  }

  ngOnInit(): void {


  
  }

}

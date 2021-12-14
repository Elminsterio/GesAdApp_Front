import { Component, OnInit } from '@angular/core';
import { ServerRequestsService } from 'src/app/services/server-requests.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent implements OnInit {

  expediente: any;
  id: any;

  constructor(public _sr: ServerRequestsService,
              public ar: ActivatedRoute,
              public router: Router ) { 

            this.id = this.ar.snapshot.params.id;
          
              }
              
  ngOnInit(): void {
                
    
  
    this._sr.getExpediente(this.id)
            .subscribe((expediente) => {
              this.expediente = expediente['expediente'];
              console.log(this.expediente);
    })
  }
}




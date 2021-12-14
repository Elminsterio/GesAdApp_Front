import { Component, OnInit } from '@angular/core';
import { ServerRequestsService } from 'src/app/services/server-requests.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-intervinientes',
  templateUrl: './intervinientes.component.html',
  styleUrls: ['./intervinientes.component.css']
})
export class IntervinientesComponent implements OnInit {
  
  expediente: object;
  id: string;

  constructor( public _rs: ServerRequestsService,
               private ar: ActivatedRoute ) { 
    
    this.id = this.ar.parent.snapshot.paramMap.get('id');

    this._rs.getExpediente( this.id )
            .subscribe(res => {this.expediente = res['expediente']; console.log(res)});

  }

  ngOnInit(): void {

  }

}

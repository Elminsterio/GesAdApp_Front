import { Component, OnInit } from '@angular/core';
import { DataJudicialService } from 'src/app/services/data-judicial.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})

export class CalendarioComponent implements OnInit {

  citas: object[] = [];
  public anioSelec = new Date().getFullYear();
  public mesSelec = new Date().getMonth() + 1;

  constructor( public _dj: DataJudicialService ) {
    
    console.log(this.anioSelec, this.mesSelec);

    this._dj.numerar(this.anioSelec, this.mesSelec);
    
  }

  
  cambiarDate(mes: any, anio: any) {
      
      this.mesSelec = this._dj.meses.findIndex((el) => el == mes) + 1;
      this.anioSelec = anio;

      console.log(this.mesSelec);
      console.log(this.anioSelec);

      this._dj.semanaDias = [[], [], [], [], [], []];

      this._dj.numerar( anio, this.mesSelec );
      
      console.log(this._dj.semanaDias)
      console.log(this.mesSelec);
      console.log(this.anioSelec);



    }


  ngOnInit(): void {

  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FestivosService {

  host: string = 'http://localhost:4000';
  
  constructor(private http: HttpClient) { }

  postFestivos(municipio: any) {
    
    return this.http.post( `${ this.host }/ScrapDias`, municipio ) 

  }


  


}

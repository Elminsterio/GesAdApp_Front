import { Directive, EventEmitter, ElementRef,
  HostListener, Input, Output } from '@angular/core';
import { documentoModel } from '../models/documento.model';

@Directive({
  selector: '[appNgOnDrop]'
})
export class NgOnDropDirective {


    @Input() archivos: documentoModel[];
    @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  
  
    constructor() { }
  
    @HostListener('dragover', ['$event'])
    public onDragEnter( event: any ) {
      this.mouseSobre.emit(true)
      this._prevenirDetener(event)
    }
  
    @HostListener('dragleave', ['$event'])
    public onDragleave( event: any ) {
      this.mouseSobre.emit(false)
    }
  
    @HostListener('drop', ['$event'])
    public onDrop( event: any ) {
      
      
      const transferencia = this._getTransferencia( event )
      
      if(!transferencia) {
        return;
      }
      
      this._extraerArchivos( transferencia.files);
      this._prevenirDetener(event)
      this.mouseSobre.emit(false);
    }
  
    private _getTransferencia(event: any) {
      return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer
    }
  
    private _extraerArchivos( archivosLista: FileList) {
  
      console.log(archivosLista);
  
      for(const propiedad in Object.getOwnPropertyNames(archivosLista)) {
  
        const archivoTemporal = archivosLista[propiedad];
        console.log(archivoTemporal);
  
        const nuevoArchivo = new documentoModel( archivoTemporal );
        this.archivos.push( nuevoArchivo );

      }
  
  
    }
  
    //Validaciones
  
  
    private _prevenirDetener( event ) {
      event.preventDefault();
      event.stopPropagation();
    }
    
}

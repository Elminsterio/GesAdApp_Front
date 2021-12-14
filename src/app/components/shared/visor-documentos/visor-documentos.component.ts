import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-visor-documentos',
  templateUrl: './visor-documentos.component.html',
  styleUrls: ['./visor-documentos.component.css']
})
export class VisorDocumentosComponent implements OnInit {
  
  Url: string;

  constructor(
    public dialogRef: MatDialogRef<VisorDocumentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data.documentoBlob.type);
    
    switch(data.documentoBlob.type) {

      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':

      break;

      case 'application/pdf':
  
      break;

      case 'text/plain':

      break;

      case 'image/':
      
      break;

      default:
   

    }


    let urlCreator = window.URL || window.webkitURL;
    this.Url = urlCreator.createObjectURL(data.documentoBlob);
    console.log(`https://docs.google.com/viewer?url=${this.Url}&embedded=true`);
   }
  
  cerrar() {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }

}

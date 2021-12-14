import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-plantilla',
  templateUrl: './dialog-plantilla.component.html',
  styleUrls: ['./dialog-plantilla.component.css']
})
export class DialogPlantillaComponent implements OnInit {

  extension: string;
  nombre: string;

  constructor(public dialogRef: MatDialogRef<DialogPlantillaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

               

               }

  onFileSelected() {
    
    const inputNode: any = document.querySelector('#file');
    
    this.data.plantillaFile = inputNode.files[0];
    this.extension = this.data.plantillaFile.name.split('.')[1];
    this.nombre = this.data.plantillaFile.name.split('.')[0];

    //if (typeof (FileReader) !== 'undefined') {
     // const reader = new FileReader();
              
     // reader.onload = (e: any) => {
      
      //  this.data = e.target.result;
     //   };
      //  reader.readAsArrayBuffer(inputNode.files[0]);
     //   }
     console.log(this.data);
      }

  onNoClick() {

      this.dialogRef.close();
      
  }

  ngOnInit(): void {

  }

}

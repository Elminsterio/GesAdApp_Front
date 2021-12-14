export class Cliente {

    nombre: string;
    apellidos: string;
    DocIdentificacion: string;
    nacionalidad: string;
    telefono: number;
    domicilio: string;
    email: string;
    numero?: string;
    _id?: string;

    constructor( nombre, apellidos, identificacion, nacionalidad, telefono, domicilio, email ) {

        this.nombre = nombre;
        this.apellidos = apellidos;
        this.DocIdentificacion = identificacion;
        this.nacionalidad = nacionalidad;
        this.telefono = telefono;
        this.domicilio = domicilio;
        this.email = email;

    }

}

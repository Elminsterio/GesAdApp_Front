import { Cliente } from './cliente.model';
import { Contrarios } from './contrario.model';

export class expedienteJudicial {

    clientes: Cliente[] | Cliente;
    parteContraria: Contrarios[] | Contrarios;
    juzgado: string;
    numeroJuzgado: string;
    partido: string;
    direccionJuzgado: string;
    tipoProcedimiento: string;
    autos: string;
    resumen: string;
    materia: string;
    usuario: string;
    iniciado: boolean;
    esDemandante: boolean;

constructor( clientes, contrarios, tipoProcedimiento, resumen, iniciado, materia, esDemandante = true, juzgado?, numeroJuzgado?, partido?, direccionJuzgado?, autos? ) {

        this.clientes = clientes;
        this.parteContraria = contrarios;
        this.juzgado = juzgado;
        this.numeroJuzgado = numeroJuzgado;
        this.partido = partido;
        this.direccionJuzgado = direccionJuzgado;
        this.autos = autos;
        this.tipoProcedimiento = tipoProcedimiento;
        this.resumen = resumen;
        this.materia = materia;
        this.iniciado = iniciado;
        this.esDemandante = esDemandante;
    }

}

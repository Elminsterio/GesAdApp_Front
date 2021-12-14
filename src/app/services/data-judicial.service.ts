import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataJudicialService {

  public semanaDias = [[], [], [], [], [], []];


  tipoExpediente = ['Jurisdicción Voluntaria', 'Civil', 'Penal', 'Laboral', 'Contencioso-Administrativo', 'Militar']

  tiposEstado = ['Pendiente de Documentos',
                 'Pendiente de Acuerdo',
                 'Desistido Cliente',
                 'Desistido Inviable', 
                 'Preparando Demanda', 
                 'Demanda Presentada',
                 'Demanda Admitida',
                 'Demanda Contestada',
                 'Audiencia Previa Señalada',
                 'Suspendido Señalamiento',
                 'Juicio Señalado',
                 'Pendiente de Sentencia',
                 'Sentencia Favorable',
                 'Sentencia Desfavorable',
                 'Sentencia Recurrida por Parte Contraria',
                 'Sentencia Recurrida por Cliente'];

  

  tiposJuzgadoCivil = ['Juzgado de Paz', 'Juzgado de Primera Instancia', 'Juzgado de Primera Instancia e Instrucción', 
                       'Audiencia Provincial', 'Tribunal Superior de Justicia', 'Tribunal Supremo', 'Tribunal Constitucional', 
                       'Juzgado de lo Mercantil ', 'Juzgado de Violencia sobre la Mujer'];

  tiposJuzgadoPenal = ['Juzgado de Paz', 'Juzgado de Primera Instancia e Instrucción', 'Juzgado de Instrucción', 'Juzgado Central de Instrucción', 'Juzgado de Menores', 
                       'Juzgado Central de Menores', 'Juzgado de lo Penal', 'Audiencia Nacional', 'Audiencia Provincial', 'Juzgado de Violencia sobre la Mujer', 'Juzgados de Vigilancia Penitenciaria',
                       'Tribunal Superior de Justicia', 'Tribunal Supremo', 'Tribunal Constitucional', 'Tribunal del Jurado'];

  tiposJuzgadoLaboral = ['Juzgado de lo Social', 'Tribunal Superior de Justicia', 'Audiencia Nacional', 'Tribunal Supremo', 'Tribunal Constitucional'];


  tiposJuzgadoContencioso = ['Juzgado de lo Contencioso-Adminsitrativo', 'Audiencia Nacional', 'Tribunal Superior de Justicia', 'Tribunal Supremo'];

  tiposDeDocumento = ['Diligencia de Ordenación', 'Decreto', 'Providencia', 'Auto', 'Sentencia', 'Exhorto', 'Demanda', 'Demanda ejecutiva', 'Escrito de contestación y/o reconvención', 'Escrito de recurso', 'Contestación de recurso', 'Otros']

  meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  
  anios = this.veinteAnios();
  
  // Calcular años.
  
  veinteAnios() {

    let arr = [];
    let fechaAhora = new Date().getFullYear();
    
    for(let i = -42; i <= 20; i++) {
      
      arr.unshift(fechaAhora += i);
      fechaAhora = new Date().getFullYear();
    }

    return arr
  }

  // Rellenar calendario.

  fechaPorDia(anio: number, mes: number, dia: number) {
    var date = new Date(anio, mes, 0);
    return new Date(date.setDate(dia));
  }
  
  numerar( anio: number, mes: number ) {
    
    let sem: number;

    for (let i = 1; i < 33; i++) {

      let fecha = this.fechaPorDia(anio, mes, i);
      let mesSelec = fecha.getMonth();
      
      if( mesSelec != mes - 1) {
        break;
      }
  
      let dia = fecha.getDate()
      let dia_semana = fecha.getDay() - 1;

      let corrector = () => {
        if(dia_semana === -1) {
        return 6
      } else { 
        return dia_semana
      }
    }
      if (dia == 1) { sem = 0 }
    
      this.semanaDias[sem][corrector()] = dia;

      if (dia_semana === - 1 ) { sem += 1 }

    }
  }
  
  // Realiza la búsqueda encajándolo en algún tipo de dato permitido. Primer filtro.

  busqueda(termino: any, arr: object[], arrBusqueda: object[]) {
        
    if(!termino) {
      return;
    }
  
    arrBusqueda.length = 0;

    if (/(\d{4,8}[^\/])(\s*-*)[A-Z]?/.test(termino)) {
  
      return this.filtraBusquedaC(termino, arr, 'DocIdentificacion')

    } else if (/(\d{1,7})\/(\d{4})/.test(termino)) {
        
      return this.filtraBusquedaC(termino, arr, 'numero')
        
    } else {
        
      return this.filtraBusquedaC(termino, arr, 'nombre')
    }
  }

  // Clasificado, retorna los resultados.

  filtraBusquedaC( termino: string, arr: object[] , tipo: string ) {
        
    let arrPersonas = [];

    termino = termino.toLowerCase();
    
    for( let i = 0; i < arr.length; i ++ ) {
  
      let personaPorI = arr[i];
  
      let nombre = personaPorI[`${tipo}`].toLowerCase();
      console.log(nombre);
      if(tipo === 'nombre') {

        nombre += ' ' + personaPorI['apellidos'].toLowerCase();

      }
    
      if( nombre.indexOf( termino ) >= 0  ){
        personaPorI['idx'] = i;
        arrPersonas.push( personaPorI )
      }
  
    }
    console.log(arrPersonas);
    return arrPersonas

  }
    
  // Opcional: Para que lleguen resultados si no se teclea nada.

  buscarConResultados(termino, clientes, buscados) {

    
    if(!termino) {
      return buscados = [...clientes]
    }

    buscados.length = 0;
    
    return buscados = this.busqueda(termino, clientes, buscados)

  }

  constructor() { }
}

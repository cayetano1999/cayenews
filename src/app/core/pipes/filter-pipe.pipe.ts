import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(values: any[], texto: string = '', column: string = ''): any {
    if(texto === ''){
      return values;
    }

    if(!values){
      return values;
    }

    texto = texto.toLowerCase();


    console.log(texto);

    return values.filter(e=> String(e[column]).toLowerCase().includes(texto));
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  private currentUser = JSON.parse(localStorage.getItem('currentUser'));
  transform(values: Array<any>, conditions: { [field: string]: any }): Array<any> {
    return values.filter(value => {
      for (let field in conditions) {
        if (value[field] !== conditions[field]) {
          return false;
        }
      }
    });
  }

}

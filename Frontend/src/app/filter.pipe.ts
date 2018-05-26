import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  private currentUser = JSON.parse(localStorage.getItem('currentUser'));
  transform(value: any, args: any): any {
    if (args === '1') {
      return value;
    }
  }

}

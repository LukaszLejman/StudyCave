import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(sets: any, search: any ): any {
    if (search === undefined || sets === undefined) {
      return sets;
    } else {
      return sets.filter(function(set){
        return set.permission.toLowerCase().includes(search.toLowerCase());
      });
    }

  }

}


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(sets: any, searchOwner: any ): any {
    if (searchOwner === undefined || sets === undefined) {
      return sets;
    } else {
      return sets.filter(function(set){
        return set.owner.toString() === (searchOwner.toString());
      });
    }

  }

}


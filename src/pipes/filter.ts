import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class Filter implements PipeTransform {

  transform(obj: any, field: string): any {
      if (obj != undefined) {
          var order = 'ASC';

          if (field[0] === '-') {
              field = field.substring(1);
              order = 'DESC';
          }

          obj.sort(function (a, b) {
              if (order === 'ASC') {
                  if (a[field] < b[field]) return -1;
                  if (a[field] > b[field]) return 1;
                  return 0;
              } else {
                  if (a[field] < b[field]) return 1;
                  if (a[field] > b[field]) return -1;
                  return 0;
              }
          });
      }
    return obj;
  }
}

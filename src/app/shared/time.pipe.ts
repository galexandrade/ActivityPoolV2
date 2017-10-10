import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(value:  any): string {
    let result = '';
    if(!isNaN(value)){
      let minutes: number = value / 60000;
      let hours:number = value / 3600000;
      hours = Math.floor(hours);
      minutes -= hours * 60;
      if(hours < 10) {
        result += '0';
      }
      result += hours + ':';
      if(minutes < 10) {
        result += '0';
      }
      result += minutes;
    } else {
      let r: string[] = /^([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$/.exec(value);
      if(r) {
        result = r[1] + ':' + r[2];
      }
    }
    return result;
  }
}

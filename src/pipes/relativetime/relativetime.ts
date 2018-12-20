import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";
/**
 * Generated class for the RelativetimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'relativetime',
})
export class RelativetimePipe implements PipeTransform {
 /**将日期格式转化为对应时间格式
  *
  *
  * @param {string} value
  * @param {*} args
  * @returns
  * @memberof RelativetimePipe
  */
 transform(value: string, ...args) {
    return moment(value).toNow();
  }
}

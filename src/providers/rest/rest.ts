import { Observable } from 'rxjs/Rx';
import { Http,Response} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: Http) {
    // console.log('Hello RestProvider Provider');
  }


  /**
   *全局获取http请求的方法
   * 这里写0个人信息及日期等
   * @param {string} url
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  getUrlReturn(url:string):Observable<string[]>{
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  extractData(res:Response){
        let body  = res.json();
        return JSON.parse(body) || {};
  }

  handleError( error:Response | any){
    let errMsg:string;
                // ↓判断error是否是一个response
    if (error instanceof Response ) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg  = `${error.status} - ${error.statusText ||''} ${err}`
    }else{
       errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

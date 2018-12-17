import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ChatserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
// 聊天属性
  export class ChatMessage{
    messageId:string;
    userId:string;
    username:string;
    userImgUrl:string;
    toUserId:string;
    time:number | string;
    message:string;
    status:string;
  }

  // 用户属性
  export class UserInfo{
    userId:string;
    userName:string;
    userImgUrl:string;
  }

@Injectable()
export class ChatserviceProvider {

  constructor(public http: Http) {
    console.log('Hello ChatserviceProvider Provider');
  }


  getMessageList():Promise<ChatMessage[]>{
    const url = '../../assets/mock/msg-list.json';
    return this.http.get(url)
                    .toPromise()
                    .then(response => response.json().array as ChatMessage[])
                    .catch(error =>Promise.reject(error||'错误信息'))
  }
}

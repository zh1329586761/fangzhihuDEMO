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

  //feed
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';

  private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";

  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
  private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";



  //notification
  private apiUrlUserNotifications = "https://imoocqa.gugujiankong.com/api/account/usernotifications";

  // 登录请求
  login(mobile,password):Observable<string[]>{
    return this.getUrlReturn(this.apiUrlLogin+"?mobile="+mobile+"&password="+password);/* url的拼接 */
  }

 
  // 获取用户的信息
  getUserInfo(userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUserInfo + "?userid=" + userId);
  }


  // 更新用户的昵称
  updateNickName(userId, nickname): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUpdateNickName + "?userid=" + userId + "&nickname=" + nickname);
  }

  // 注册请求
  register(mobile,nickname,password):Observable<string[]>{
    return this.getUrlReturn(this.apiUrlRegister+"?mobile="+mobile+"&nickname="+nickname+"&password="+password)
  }
  
  /**
   *全局获取http请求的方法
   * 这里写个人信息及日期等
   * @param {string} url
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  getUrlReturn(url:string):Observable<string[]>{
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  // 处理接口返回的数据，处理成 json 格式
  extractData(res:Response){
        let body  = res.json();
        return JSON.parse(body) || {};
  }

  // 处理请求中的错误，考虑了各种情况的错误处理并在 console 中显示 error
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

  // 保存提问
  saveQuestion(userId, title, content): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlQuestionSave + "?userid=" + userId + "&title=" + title + "&content=" + content);
  }

  // 首页加载提出的问题列表
  getFeeds():Observable<string[]>{
    return this.getUrlReturn(this.apiUrlFeeds)
  }

  // 加载问题详情的页面
  getQuestion(id): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlGetQuestion + "?id=" + id);
  }

  /**
   * 获取问题的详情，传递 userid 获取到当前用户有没有关注此问题
   * 
   * @param {any} questionId 
   * @param {any} userId 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  getQuestionWithUser(questionId, userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlGetQuestionWithUser + "?id=" + questionId + "&userid=" + userId);
  }

// 关注问题
  saveFavourite(questionId, userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlSaveFavourite + "?questionid=" + questionId + "&userid=" + userId);
  }

  answer(userId, questionId, content): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlAnswer + "?userid=" + userId + "&questionid=" + questionId + "&content=" + content);
  }

  
   /**
   * 获取所有的新问题
   * 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  getQuestions(): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlQuestionList);
  }

  
  getUserNotifications(userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUserNotifications + "?userid=" + userId);
  }

}
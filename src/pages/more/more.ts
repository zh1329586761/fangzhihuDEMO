import { UserPage } from './../user/user';
import { Component } from '@angular/core';
import {  NavController, NavParams, ModalController, LoadingController, IonicPage } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { Storage } from "@ionic/storage";
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {
  public notLogin =true; /* 是否未登录 默认为是 */
  public logined = false;/* 是否已登录   默认为否 */
  public headface:string;
  public userinfo:string[];
  public UserNickName:string;

  public UserPage=UserPage;
  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public modalCtrl:ModalController,
              public storage:Storage,
              public loadCtrl:LoadingController,
              public rest:RestProvider,
              ) {
   super();
  }
  ionViewDidEnter(){
    this.loadUserPage();
  }


  loadUserPage(){
    this.storage.get('UserId').then((val)=>{
      if (val!=null) {
        var loading  = super.showLoading(this.loadCtrl,"加载中。。。");
        this.rest.getUserInfo(val)
                 .subscribe(
                   userinfo=>{
                     this.userinfo = userinfo;
                     this.UserNickName=this.userinfo["UserNickName"];
                     console.log(this.userinfo);
                     console.log(this.userinfo["UserNickName"]);
                     this.headface = userinfo["UserHeadface"]+ "?" + (new Date()).valueOf();
                     this.notLogin=false;
                     this.logined=true;
                     loading.dismiss();
                   }
                 );
        this.notLogin = false;/* 更改未登录为否 */
        this.logined = true;/* 更改已登录为是 */
      } else {
        this.notLogin = true;/* 更改未登录为是 */
        this.logined = false;/* 更改已登录为否 */
      }
    })
  }

  // 弹出登录框
  showModal() {
    
    let modal = this.modalCtrl.create(LoginPage);
    //关闭后的回调
    modal.onDidDismiss(()=>{
      this.loadUserPage();
    })
    modal.present()
    
  }



  
}

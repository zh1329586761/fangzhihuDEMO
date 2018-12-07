import { Component } from '@angular/core';
import {  NavController, NavParams, ModalController, LoadingController, IonicPage } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { Storage } from "@ionic/storage";
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
export class MorePage {
  public notLogin =true; /* 是否未登录 默认为是 */
  public logined = false;/* 是否已登录   默认为否 */

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public modalCtrl:ModalController,
              public storage:Storage,

              ) {
   
  }
  ionViewDidEnter(){
    this.loadUserPage();
  }

  loadUserPage(){
    this.storage.get('UserId').then((val)=>{
      if (val!=null) {
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
    modal.present()
    
  }



  
}

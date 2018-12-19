import { ScanPage } from './../scan/scan';
import { SettingsProvider } from './../../providers/settings/settings';
import { UserdatalistPage } from './../userdatalist/userdatalist';
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
  public selectedTheme:string;
  public UserPage=UserPage;
  public ScanPage=ScanPage;

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public modalCtrl:ModalController,
              public storage:Storage,
              public loadCtrl:LoadingController,
              public rest:RestProvider,
              private settings:SettingsProvider,

              ) {
   super();
   this.settings.getActiveTheme().subscribe(
    (val)=>{ 
      this.selectedTheme = val
    }
  );
  }
  ionViewWillEnter(){
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


  gotoDataList(type){
    this.navCtrl.push(UserdatalistPage,{"dataType":type});
  }
  
  /**
   *跳转到扫描二维码的页面，这里加上animate=false的参数是为了相机能够在整个屏幕中
   显示 如果不加的话 相机就出不来
   *  animate默认设置为true
   * @memberof MorePage
   */
  
  gotoscanQR(){
    this.navCtrl.push(ScanPage,null,{"animate":false});
  }

  toggleChangeTheme(){
        if (this.selectedTheme === 'dark-theme') {
          this.settings.setActiveTheme('light');
        } else {
          this.settings.setActiveTheme('dark-theme')
        }
  }
}

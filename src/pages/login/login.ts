import { MorePage } from './../more/more';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from "../../common/baseui";
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { ThrowStmt } from '@angular/compiler';
// import { BaseUI } from '../../common/baseui';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI{
  mobile: any;
  password: any;
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider,
    public  storage:Storage,

    ) {
     super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

 login(){
   var loading= super.showLoading(this.loadingCtrl,"登录中。。。");
   this.rest.login(this.mobile,this.password)
   .subscribe(/* subscribe订阅回来的东西 */
    f=>{
      if (f["Status"]=="OK") {
        // 处理登录成功的页面跳转
        this.storage.set('UserId',f["UserId"]);
        loading.dismiss();  /* 取消登录中的加载图标 */
        this.dismiss();  /* 关闭当前弹出的登录页面 */
        // this.navCtrl.push(MorePage);
      } else {
        loading.dismiss();
        super.showToast(this.toastCtrl,f["StatusContent"]);
      }
    },
    error=>this.errorMessage = <any>error)
 }

 pushRegisterPage(){
    this.navCtrl.push(RegisterPage)
  }

  /**
   * 关闭当前页面的方法
   * 
   * @memberof LoginPage
   */
  dismiss() {
    this.navCtrl.pop();
  }


  
}

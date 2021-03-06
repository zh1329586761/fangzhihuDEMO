import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Loading } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage  extends BaseUI{
  public LoginPage=LoginPage;
  public mobile:any;
  public nickname:any;
  public password:any;
  public confirmPassword:any;
  public errorMessage:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public stoorage:Storage,
    public rest:RestProvider,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController  
    ,
    ) {
      super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
  
  doRegister(){
    if (!(/^1[345789]\d{9}$/.test(this.mobile))) {
      super.showToast(this.toastCtrl,"您的手机号码格式不正确")     
    }else if(this.nickname.length<3 ||this.nickname.length>10
      ){
      super.showToast(this.toastCtrl,'昵称请在6~15个字符之内，请重新输入')
    }else if(this.password.length<6 ||this.password.length>15 ||
      this.confirmPassword.length<6 ||this.confirmPassword.length>15 ){
      super.showToast(this.toastCtrl,'密码长度应在6到15个字符之内')
    }
    else if (this.password!=this.confirmPassword) {
      super.showToast(this.toastCtrl,'密码输入不一致，请重新输入')
    } else {
      var loading =super.showLoading(this.loadingCtrl,'注册加载中...');
       this.rest.register(this.mobile,this.nickname,this.password)
                .subscribe(
                  f=>{
                    console.log(f)
                    if (f["Status"]=="OK") {
                      loading.dismiss();
                      super.showToast(this.toastCtrl,"恭喜注册成功")
                      this.dismiss();
                    } else {
                      loading.dismiss();
                      super.showToast(this.toastCtrl,f["StatusContent"]);/* 返回接口上的内容告诉为什么注册失败了 */
                    }
                  },
                  error => this.errorMessage = <any>error
                );
    }

   
  }
}

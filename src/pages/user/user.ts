import { Storage } from '@ionic/storage';
import { LoadingController, ToastController, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';
import { Observable } from 'rxjs';
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI{
  public headface:string = "http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg?";
  public nickname:string = '加载中。。。';
  public errorMessage:any;
  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public modalCtrl:ModalController,
              public storage:Storage,
              public loadCtrl:LoadingController,
              public rest:RestProvider,
              public toastCtrl:ToastController,
              public viewctrl:ViewController,

              ) {
                super();
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  loadUserPage(){
    this.storage.get('UserId').then((val)=>{
      if (val!=null) {
        var loading  = super.showLoading(this.loadCtrl,"加载中。。。");
        this.rest.getUserInfo(val)
                 .subscribe(
                   userinfo=>{
                     this.nickname = userinfo["UserNickName"];
                     this.headface = userinfo["userHeadface"]+ "?" + (new Date()).valueOf();
                     loading.dismiss();
                   },
         error => this.errorMessage = <any>error);
        
      } 
    })
  }


  updateNickName(){
    this.storage.get('UserId').then((val)=>{
      if (val!=null) {
        var loading = super.showLoading(this.loadCtrl,"正在修改中。。。");
        this.rest.updateNickName(val,this.nickname)
                 .subscribe(
                   f=>{
                     if (f["Status"]=="OK") {
                       loading.dismiss();
                       super.showToast(this.toastCtrl,"修改昵称成功");
                     }
                     else {
                       loading.dismiss();
                       super.showToast(this.toastCtrl,f["StatusContent"]); 
                     }
                   },
                   error => this.errorMessage = <any>error);
      }
    });
  }

  
  outLogin(){
    this.storage.remove('UserId');
    this.viewctrl.dismiss();
  }
}

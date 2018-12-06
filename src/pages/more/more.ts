import { Component } from '@angular/core';
import {  NavController, NavParams, ModalController, LoadingController, IonicPage } from 'ionic-angular';
import { LoginPage } from '../login/login';


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

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public modalCtrl:ModalController,
               
              ) {
   
  }

  showModal() {
    
    let modal = this.modalCtrl.create(LoginPage);
    //关闭后的回调
    modal.present()
    
  }



  
}

import { DetailsPage } from './../details/details';
import { LoadingController, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends BaseUI {
      errorMessage: any;
      notificationList: string[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl:ModalController,
    public storage:Storage,
    public loadCtrl:LoadingController,
    public rest:RestProvider,
    public toastCtrl:ToastController,
    public viewctrl:ViewController,

    ) {

    super()
  }

  ionViewDidLoad() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        //加载用户数据
        var loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getUserNotifications(val)
          .subscribe(
          n => {
            this.notificationList = n;
            loading.dismissAll();
          },
          error => this.errorMessage = <any>error);
      }
    });
  }

  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage, { id: questionId });
  }

}

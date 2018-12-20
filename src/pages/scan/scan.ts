import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public qrScanner: QRScanner

    ) {
  }

  ionViewDidEnter(){
    this.scanQRcode(); 
  }
  
  scanQRcode() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
          // 授权
        if (status.authorized) {
          window.document.querySelector('body').classList.add('transparent-body');
          // 让相机扫描
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            let alert = this.alertCtrl.create({
              title: '二维码内容',
              subTitle: text,
              buttons: ['OK']
            });
            alert.present();
            scanSub.unsubscribe();
          });

          this.qrScanner.show();

        }
        else if (status.denied) {
          //提醒用户权限没有开
        }
        else {

        }
      })
      .catch((e: any) => console.error('Error :', e));
  }
}
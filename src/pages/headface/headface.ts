import { ToastController, ViewController, normalizeURL } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, LoadingController, Platform } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';

import { File } from "@ionic-native/file";
import { Transfer,TransferObject } from "@ionic-native/transfer";
import { Camera,CameraOptions} from "@ionic-native/camera";
import { FilePath } from "@ionic-native/file-path";

declare var cordova:any;

/**
 * Generated class for the HeadfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage  extends BaseUI{
  public userID:string;
  public errorMessage:string;
  public lastImage:string = null;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public actionSheetCtrl:ActionSheetController,
     public modalCtrl:ModalController,
     public storage:Storage,
     public loadCtrl:LoadingController,
     public rest:RestProvider,
     public camera:Camera,
     public transfer:Transfer,
     public file:File,
     public filePath:FilePath,
     public platform:Platform,
     public toastCtrl:ToastController,
     public viewCtrl:ViewController,


     ) {
       super();
  }


  ionViewDidEnter(){
    this.storage.get('UserId').then((val)=>{
      if (val!=null) {
        var loading  = super.showLoading(this.loadCtrl,"加载中。。。");
        this.rest.getUserInfo(val)
                 .subscribe(
                   userinfo=>{
                    
                     loading.dismiss();
                   }
                 );
        
      } 
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeadfacePage');
  }

  presentActionSheet(){
    const actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [
        {
          text: '从图片选择',
          // role: 'destructive',
          handler: () => {
            this.takepicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            console.log('正在从图片库中选择');
          }
        },{
          text: '拍照',
          handler: () => {
            this.takepicture(this.camera.PictureSourceType.CAMERA);
            console.log('打开相机中');
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('取消');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takepicture(sourceType){
    const options: CameraOptions = {
      quality: 100,
      sourceType:sourceType,
      saveToPhotoAlbum:false,
      correctOrientation:true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imagePath) => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY)  {
        this.filePath.resolveNativePath(imagePath)  /* 获取安卓平台下的真实路径 */
                    .then(filePath => {
                      // 获取正确的路径
                      let correctPath = filePath.substr(0,filePath.lastIndexOf('/')+1);
                      // 获取正确的文件名
                      let currentName = imagePath.substring(imagePath.lastIndexOf('/')+1,imagePath.lastIndexOf('?'));
                      this.copyFileToLocalDir(correctPath,currentName,this.creatFileName())
                    })
                    .catch(err => console.log(err));
      }else{/* 获取其他平台下的真实路径 */
                      // 获取正确的路径
                      let correctPath = imagePath.substr(0,imagePath.lastIndexOf('/')+1);
                      // 获取正确的文件名
                      let currentName = imagePath.substring(imagePath.lastIndexOf('/')+1);
                      this.copyFileToLocalDir(correctPath,currentName,this.creatFileName())
      }
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imagePath;
     }, (err) => {
       super.showToast(this.toastCtrl,"选择出现错误，请检查权限")
     });
  }

  // 图片另存为，供本地使用
  copyFileToLocalDir(namepath,currentName,newFileName){
      this.file.copyFile(namepath,currentName,cordova.file.dataDirectory,newFileName).then(success=>{
          this.lastImage = newFileName;

      }, (err) => {
        super.showToast(this.toastCtrl,"储存图片到本地出现错误")
      });
  }

  // 为文件生成一个新的文件名
  creatFileName(){
      var d = new Date(),
      n = d.getTime(),
      newFileName = n+ ".jpg";  /* 拼接文件名 */
      return newFileName;
  }

  // 处理图片的路径为可以上传的路径
  pathForImage(img){
    if (img === null) {
      return '';
    } else {
      return normalizeURL(cordova.file.dataDirectory + img);
    } 
  }

  uploadImage(){
    var url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface';
    var targetPath = this.pathForImage(this.lastImage);
    var filename = this.userID + ".jpg"; //定义上传后的文件名

    //fileTransfer 上传的参数
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,  /* 是否为块状元素 */
      mimeType: "multipart/form-data",
      params: { 'fileName': filename, 'userid': this.userID }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    var loading = super.showLoading(this.loadCtrl, "上传中...");

    //开始正式地上传
    fileTransfer.upload(targetPath, url, options).then((data) => {
      loading.dismiss();
      super.showToast(this.toastCtrl, "图片上传成功。");
      //在用户看清弹窗提示后进行页面的关闭
      setTimeout(() => {
        this.viewCtrl.dismiss();
      }, 3000);
    }, (err) => {
      loading.dismiss();
      super.showToast(this.toastCtrl, "图片上传发生错误，请重试。");
    });
  }

}



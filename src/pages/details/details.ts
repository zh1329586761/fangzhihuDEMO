import { AnswerPage } from './../answer/answer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI{
  id:string;
  userId: string;
  question:string[];
  answers:string[];
  errorMessage:any;
  isFavourite:boolean;
  isMyQuestion: boolean;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl:ModalController,
    public viewCtrl: ViewController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,

    ) {
      super();
  }

  ionViewDidLoad() {
    this.id = this.navParams.get("id");
    this.loadQuestion(this.id);
  }

  loadQuestion(id){
    this.storage.get("UserId").then(
      (val)=>{
        if (val!==null) {
          this.userId = val;
          var loading = super.showLoading(this.loadingCtrl,"加载中...")
          this.rest.getQuestionWithUser(id,val)
                   .subscribe(
                     (q)=>{
                        this.question =q;
                        this.answers = q["Answers"];
                        this.isFavourite = q["IsFavourite"];
                        this.isMyQuestion =(q["OwnUserID"] == val);
                        loading.dismissAll();
                     },
                     (error)=>{
                        this.errorMessage = <any>error
                     }
                   );
        }
      }
    )
  }

  saveFavourite(){
    var loading = super.showLoading(this.loadingCtrl,"加载中...");
    this.rest.saveFavourite(this.id,this.userId)
             .subscribe(
               (data)=>{
                  if (data["Status"] == "OK") {
                    loading.dismiss();
                    super.showToast(this.toastCtrl,this.isFavourite ? "取消关注成功":"关注问题成功");
                    this.isFavourite =!this.isFavourite;
                  }
               },
               (err)=>{
                 this.errorMessage = <any>err
               }
             )
  }

  showAnswerPage(){
    let modal = this.modalCtrl.create(AnswerPage,{"id":this.id});
    modal.present();
  }
}

import { DetailsPage } from './../details/details';
import { Storage } from '@ionic/storage';
import { QuestionPage } from './../question/question';

import { Component } from '@angular/core';
import { NavController, ModalController, Tabs, ViewController, LoadingController, ToastController, Loading } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';

@Component({
  selector: 'page-home',

  templateUrl: 'home.html'
})
export class HomePage extends BaseUI{
  public QuestionPage=QuestionPage;
  feeds: string[];
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public modalCtrl:ModalController,
    public viewCtrl: ViewController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,

    ) {
      super();
  // this.pushPage - LolPage;
  // this.params = {id:42};
  }

  ionViewDidLoad(){
    this.getFeeds();
  }

  // 跳转到提问页面
  gotoQuestion(){
    var modal = this.modalCtrl.create(QuestionPage);
    modal.present();
  }
  
  // 跳转到问题详情页面
  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage, { id: questionId });
  }

  gotoChat(){
    // 去第三个页面
    this.selectTabs(2);
  }

  // 选择底端tabs切换
  selectTabs(index:number){
    var t:Tabs = this.navCtrl.parent;
    t.select(index);
  }

  // 加载问题页面
  getFeeds(){
    var loading = super.showLoading(this.loadingCtrl,"加载中");
    this.rest.getFeeds()
             .subscribe(
               (f) =>{
                this.feeds = f;
                loading.dismiss()
               },
               (error)=>{
                 this.errorMessage = <any>error
               }
             )
  }
}   

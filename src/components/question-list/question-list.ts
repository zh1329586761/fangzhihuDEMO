import { DetailsPage } from './../../pages/details/details';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController } from 'ionic-angular';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the QuestionListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListComponent extends BaseUI{

  errorMessage:any;
  question:string[];

  @Input('datatype') dataSourceType;

  constructor(
    public navCtrl:NavController,
    public navparams:NavParams,
    public modalCtrl:ModalController,
    public loadCtrl:LoadingController,
    public rest:RestProvider,
    public toastCtrl:ToastController,
    public storage:Storage


  ) {
    super();
  }

   //这里没有 ionViewDidLoad 生命周期的函数
   ngAfterContentInit(){
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        //加载用户数据
        var loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getUserQuestionList(val,this.dataSourceType)
          .subscribe(
          q => {
            this.question = q;
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

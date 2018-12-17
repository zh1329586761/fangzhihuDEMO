import { Storage } from '@ionic/storage';
import { ChatserviceProvider, ChatMessage } from './../../providers/chatservice/chatservice';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, TextInput } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ChatdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatdetails',
  templateUrl: 'chatdetails.html',
})
export class ChatdetailsPage {
    chatUserName:string;
    chatUserId:string;
    userId:string;
    userName:string;
    userImgUrl:string;
    isOpenEmojiPicker = false;
    messageList:ChatMessage[] = [];
    errorMessage: any;
    editorMessage:string;
    @ViewChild(Content) content:Content;
    @ViewChild('chatInput') messageInput:TextInput;
      
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public chatService:ChatserviceProvider,
    public rest:RestProvider,
    public storage:Storage,
    ) {
    this.chatUserName = navParams.get('username');
    this.chatUserId = navParams.get('userid')
  }

  ionViewDidEnter(){
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.rest.getUserInfo(val)
          .subscribe(
          userinfo => {
            this.userId = '140000198202211138';
            this.userName = userinfo["UserNickName"];
            this.userImgUrl = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
          },
          error => this.errorMessage = <any>error);
      }
    });

      this.getMessages()
          .then(
            ()=>{
              this.scrollToBottom();
            });
  }

  sendMessage(){

  }

  focus(){
      this.isOpenEmojiPicker = false;
      // 告诉内容重新计算它的尺寸。这应该在动态添加/删除标题、页脚或选项卡之后调用。
      this.content.resize();
      this.scrollToBottom();
  }
  // 调用service的方法并进行属性的赋值 
  getMessages(){
    return this.chatService.getMessageList()
                           .then(res =>{
                              this.messageList = res;
                           })
                           .catch(error =>{
                              console.log(error);
                           })
  }

  // 点击表情图标显示下方所有表情
  switchEmojiPicker(){
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }

  scrollToBottom(): any {
      setTimeout(() => {
        if (this.content.scrollToBottom) {
          this.content.scrollToBottom();
        }
      }, 400);
  }
}

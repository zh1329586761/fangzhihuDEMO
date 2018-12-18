import { Storage } from '@ionic/storage';
import { ChatserviceProvider, ChatMessage } from './../../providers/chatservice/chatservice';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, TextInput, Events } from 'ionic-angular';
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
    @ViewChild(Content) content:Content;/* 全局的content */
    @ViewChild('chatInput') messageInput:TextInput;/* 获取前台的输入框 */
      
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public chatService:ChatserviceProvider,
    public rest:RestProvider,
    public storage:Storage,
    public event:Events,

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
      /* 进行消息的发布、订阅 */
      this.event.subscribe('chat.received',(msg,time)=>{
        this.messageList.push(msg); 
      })
  }

  sendMessage(){
    if (!this.editorMessage.trim())
      return;
      const id = Date.now().toString();
      let messageSend : ChatMessage =  {
        messageId:id,
        userId:this.userId,
        username:this.userName,
        userImgUrl:this.userImgUrl,
        toUserId:this.chatUserName,
        time:Date.now(),
        message:this.editorMessage,
        status:'pending'
    }

    this.messageList.push(messageSend);
    this.scrollToBottom();

    this.editorMessage ='';
    if (!this.isOpenEmojiPicker) {
      this.messageInput.setFocus();
    }
    // 发送消息并改变消息的状态
    this.chatService.sendMessage(messageSend)
    .then(()=>{
      let index = this.getMessageIndex(id);
      if (index!==1) {
        this.messageList[index].status = 'success';
      }
    })
  }


 ionViewWillLeave(){
   /* 取消事件的订阅 */
   this.event.unsubscribe('chat.received')
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

  getMessageIndex(id: string): any {
    return this.messageList.findIndex(e =>e.messageId === id);
  }
}

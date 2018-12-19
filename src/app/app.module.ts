import { ScanPage } from './../pages/scan/scan';
import { UserdatalistPage } from './../pages/userdatalist/userdatalist';
import { ChatdetailsPage } from './../pages/chatdetails/chatdetails';
import { AnswerPage } from './../pages/answer/answer';
import { QuestionPage } from './../pages/question/question';
import { File } from "@ionic-native/file";
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { Transfer } from '@ionic-native/transfer';
import { HeadfacePage } from './../pages/headface/headface';
import { UserPage } from './../pages/user/user';

import { RelativetimePipe } from "../pipes/relativetime/relativetime";
// 根模块，告诉我们怎么组装应用

// 引入angular以及ionic的系统模块
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { HttpModule, JsonpModule} from '@angular/http';
// 引入components模块
import { ComponentsModule } from '../components/components.module';

// 引入根组件
import { MyApp } from './app.component';
// 页面  自定义的组件

import { DiscoveryPage } from '../pages/discovery/discovery';
import { ChatPage } from '../pages/chat/chat';
import { NotificationPage } from '../pages/notification/notification';
import { MorePage } from '../pages/more/more';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
// ionic打包成app以后配置启动画面 以及导航条的服务  【不用管】
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { IonicStorageModule } from '@ionic/storage';
import { DetailsPage } from '../pages/details/details';
import { EmojiProvider } from '../providers/emoji/emoji';
import { ChatserviceProvider } from '../providers/chatservice/chatservice';
import { SettingsProvider } from '../providers/settings/settings';
// import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [   /* 声明组件 */
  MyApp,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatdetailsPage,
    RelativetimePipe,
    UserdatalistPage,
    ScanPage
  ],
  imports: [  /* 引入模块or依赖的模块 */
    BrowserModule,
    HttpModule, 
    JsonpModule,
    IonicModule.forRoot(MyApp,{
      backButtonTex:'返回',
    }),
    ComponentsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],  /* 启动的模块 */
  entryComponents: [    /* 配置不会再模板中使用的组件 */
    MyApp,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatdetailsPage,
    UserdatalistPage,
    ScanPage
  ],
  providers: [    /* 配置服务 */
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    File,
    Transfer,
    FilePath,
    Camera,
    EmojiProvider,
    ChatserviceProvider,
    SettingsProvider,
    

  ]
})
export class AppModule {}

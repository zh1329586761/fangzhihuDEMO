import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { DiscoveryPage } from '../discovery/discovery';
import { ChatPage } from '../chat/chat';
import { NotificationPage } from '../notification/notification';
import { MorePage } from '../more/more';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DiscoveryPage;
  tab3Root = ChatPage;
  tab4Root = NotificationPage;
  tab5Root = MorePage;
 

  constructor() {

  }
}

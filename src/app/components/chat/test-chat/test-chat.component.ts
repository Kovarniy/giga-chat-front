import {Component, OnInit} from '@angular/core';
import * as SockJS from 'sockjs-client';
import {CompatClient, Stomp} from '@stomp/stompjs';
import {AuthService} from "../../../services/auth.service";
import {StompService} from "../../../services/stomp.service";
import {Message} from "../../../models/Message";

@Component({
  selector: 'app-test-chat',
  templateUrl: './test-chat.component.html',
  styleUrls: ['./test-chat.component.scss']
})
export class TestChatComponent implements OnInit {

  messages: Message[] = [];

  constructor(private stompService: StompService,
              private authSerive: AuthService) {
  }

  ngOnInit(): void {
    this.stompService.subsctibe( 'id_Test_Private_Chat1', (message) => {
      const _message: Message = JSON.parse(message.body);
      this.messages.push(_message);
    });
  }

  send() {
    const user = JSON.parse(localStorage.getItem("user"));
    const data: Message = {
      sender: user ? user : null,
      text: 'dsds',
      isRead: false,
      chat: {
        id: 'id_Test_Private_Chat1'
      }
    };
    this.stompService.send(data);
  }

  showGreeting(message) {
    alert(message);
    console.log("Great")
    console.log(message);
  }

}
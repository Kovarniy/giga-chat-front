import {Component, OnInit} from '@angular/core';
import {WebsocketService} from "../../../websocket";
import {WS} from "../../../models/websocket.events";
import {IMessage} from "../../../models/IMessage";
import {Observable} from "rxjs";
import {WebSocketAPI} from "../../../websocket/WebSocketAPI";
// import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {CompatClient, Stomp} from '@stomp/stompjs';
import {AuthService} from "../../../services/auth.service";
import {Message} from "../../../models/Message";

@Component({
  selector: 'app-test-chat',
  templateUrl: './test-chat.component.html',
  styleUrls: ['./test-chat.component.scss']
})
export class TestChatComponent implements OnInit {
  title = 'grokonez';
  description = 'Angular-WebSocket Demo';

  greetings: string[] = [];
  disabled = true;
  name: string;
  socket = new SockJS('http://localhost:8080/chat');
  stompClient: CompatClient;
  chat = '/api/chat/id_Test_Private_Chat1';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.stompClient = Stomp.over(this.socket);
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    this.stompClient.connect({}, (frame) => {
      this.setConnected(true);
      console.log('Connected: ' + frame);

      this.stompClient.subscribe('/topic/chat/id_Test_Private_Chat1', (message: any) => {
        this.showGreeting(message);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  send() {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      sender: user ? user : null,
      text: 'dsds',
      isRead: false,
      chat: {
        id: 'id_Test_Private_Chat1'
      }
    };
    this.stompClient.send(
      this.chat,
      { 'Authorization': `Bearer ${this.authService.getToken()}` },
      JSON.stringify(data)
    );
  }

  showGreeting(message) {
    alert(message);
    console.log(message);
  }

}

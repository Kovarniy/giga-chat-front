import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import {CompatClient, Stomp} from '@stomp/stompjs';
import {Message} from "../models/Message";

@Injectable({
  providedIn: 'root'
})
export class StompService {

  stompClient = Stomp.over(function () {
      return new SockJS('http://localhost:8080/chat');
    });
  chatUrl: string = '/api/chat/';
  topicUrl: string = '/topic/chat/';

  constructor() {
  }

  public subsctibe(chatId: string, callback: any) {
    const isConnected = this.stompClient.connected;

    if (isConnected) {
      this.subscribeToChat(chatId, callback);
      return;
    }

    this.stompClient.connect({}, (frame) => {
      console.log('Connected ' + frame);
      this.subscribeToChat(chatId, callback);
    });
  }

  public send(message: Message) {
    this.stompClient.send(
      `${this.chatUrl}${message.chat.id}`,
      {},
      JSON.stringify(message)
    );
  }

  private subscribeToChat(chatId: string, callback: any) {
    this.stompClient.subscribe(this.topicUrl + chatId, (message): any => {
      callback(message);
    })
  }

}
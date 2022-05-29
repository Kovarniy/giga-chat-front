import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {TestChatComponent} from "../components/chat/test-chat/test-chat.component";

export class WebSocketAPI {
  //
  // webSocketEndPoint: string = 'http://localhost:8080/chat';
  // chat: string = "/id_Test_Private_Chat1";
  // stompClient: any;
  // testChatComponent: TestChatComponent;
  //
  // constructor(testChatComponent: TestChatComponent){
  //   this.testChatComponent = testChatComponent;
  // }
  //
  // _connect() {
  //   console.log("Initialize WebSocket Connection");
  //   let ws = new SockJS(this.webSocketEndPoint);
  //   this.stompClient = Stomp.over(ws);
  //
  //   this.stompClient.connect({}, (frame) => {
  //     this.stompClient.subscribe(this.topic, (sdkEvent) => {
  //       this.onMessageReceived(sdkEvent);
  //     });
  //
  //     //_this.stompClient.reconnect_delay = 2000;
  //   }, this.errorCallBack);
  // };
  //
  // _disconnect() {
  //   if (this.stompClient !== null) {
  //     this.stompClient.disconnect();
  //   }
  //   console.log("Disconnected");
  // }
  //
  // // on error, schedule a reconnection attempt
  // errorCallBack(error) {
  //   console.log("errorCallBack -> " + error)
  //   setTimeout(() => {
  //     this._connect();
  //   }, 5000);
  // }
  //
  // /**
  //  * Send message to sever via web socket
  //  * @param {*} message
  //  */
  // _send(message) {
  //   console.log("calling logout api via web socket");
  //   this.stompClient.send(this.chat, {}, JSON.stringify(message));
  // }
  //
  // onMessageReceived(message) {
  //   console.log("Message Recieved from Server :: " + message);
  //   this.testChatComponent.handleMessage(JSON.stringify(message.body));
  // }

}

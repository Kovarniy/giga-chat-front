import { Component, OnInit } from '@angular/core';
import {WebsocketService} from "../../../websocket";
import {WS} from "../../../models/websocket.events";
import {IMessage} from "../../../models/IMessage";
import {Observable} from "rxjs";

@Component({
  selector: 'app-test-chat',
  templateUrl: './test-chat.component.html',
  styleUrls: ['./test-chat.component.scss']
})
export class TestChatComponent implements OnInit {

  text: string;

  private messages$: Observable<IMessage[]>;

  constructor(private wsService: WebsocketService) {
  }

  ngOnInit(): void {
    this.messages$ = this.wsService.on<IMessage[]>(WS.ON.MESSAGES);
  }

  submit() {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      sender: !user ? user : null,
      text: this.text,
      isRead: false,
      chat: {
        id: 'id_Test_Private_Chat1'
      }
    };
    this.wsService.send('message', data);

  }

}

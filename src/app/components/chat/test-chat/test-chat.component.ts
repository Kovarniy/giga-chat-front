import { Component, OnInit } from '@angular/core';
import {WebsocketService} from "../../../websocket";
import {WS} from "../../../models/websocket.events";
import {IMessage} from "../../../models/IMessage";

@Component({
  selector: 'app-test-chat',
  templateUrl: './test-chat.component.html',
  styleUrls: ['./test-chat.component.scss']
})
export class TestChatComponent implements OnInit {

  constructor(private wsService: WebsocketService) {
    this.wsService.on<IMessage[]>(WS.ON.MESSAGES)
      .subscribe((messages: IMessage[]) => {
        console.log(messages);

        this.wsService.send('message', 'Test Text!');
      });
  }

  ngOnInit(): void {
  }

}

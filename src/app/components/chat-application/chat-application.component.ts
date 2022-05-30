import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {Chat} from "../../models/Chat";
import {ChatTypes} from "../../models/constants/ChatTypes";

@Component({
  selector: 'app-chat-application',
  templateUrl: './chat-application.component.html',
  styleUrls: ['./chat-application.component.scss']
})
export class ChatApplicationComponent implements OnInit {

  privateChats: Chat[];
  allChats: Chat[];
  channelChats: Chat[];

  /**
   * хранит состояние 'какой чат открыт'.
   */
  currentChatState: any;

  /**
   * хранит состояние 'какой канал открыт'.
   */
  currentChannelState: any;


  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatService.getUserChats()
      .subscribe({
        next: (allChats: Chat[]) => {
          this.allChats = allChats;

          this.privateChats = allChats.filter(chat => chat.chatType === ChatTypes.privateType);
          console.log(this.privateChats)
        },
        error: (err => {
          console.log(err);
        })
      })
  }


  onChatOpen(event: any) {
    console.log('Текущий чат ' + event)
  }
}

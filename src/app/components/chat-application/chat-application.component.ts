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
   * Текущий чат
   */
  currentChat: any;

  /**
   * хранит состояние 'какой канал открыт'.
   */
  currentChannelState: any;

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatService.getUserPrivateChats()
      .subscribe({
        next: (privateChats: Chat[]) => {
          this.privateChats = privateChats;
          console.log(this.privateChats)
        },
        error: (err => {
          console.log(err);
        })
      })
  }


  /**
   * @param chat id выбранного чата
   */
  onChatOpen(chat: Chat) {
    console.log('Текущий чат ' + chat.id)
    this.currentChat = chat;
  }
}

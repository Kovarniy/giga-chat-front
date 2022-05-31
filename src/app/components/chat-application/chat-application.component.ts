import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {Chat} from "../../models/Chat";
import {Channel} from "../../models/Channel";

@Component({
  selector: 'app-chat-application',
  templateUrl: './chat-application.component.html',
  styleUrls: ['./chat-application.component.scss']
})
export class ChatApplicationComponent implements OnInit {

  chats: Chat[];

  /**
   * Текущий чат
   */
  currentChat: Chat;

  /**
   * хранит состояние 'какой канал открыт'.
   */
  currentChannel: Channel;

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatService.getUserPrivateChats()
      .subscribe({
        next: (privateChats: Chat[]) => {
          this.chats = privateChats;
          console.log(this.chats)
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

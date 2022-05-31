import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chat} from "../../../../models/Chat";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  @Input() chats: Chat[];
  @Output() chatOpen: EventEmitter<Chat> = new EventEmitter();

  currentChat: Chat
  constructor() { }

  ngOnInit(): void {
  }

  onChatOpen(chat: Chat) {
    this.chatOpen.emit(chat);
    this.currentChat = chat;
    console.log(this.currentChat)
  }
}

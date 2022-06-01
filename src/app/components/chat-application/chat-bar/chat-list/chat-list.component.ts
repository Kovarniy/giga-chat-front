import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chat} from "../../../../models/Chat";
import {Channel} from "../../../../models/Channel";
import {User} from "../../../../models/user";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  @Input() chats: Chat[];
  @Input() currentChannel: Channel;

  @Output() chatOpen: EventEmitter<Chat> = new EventEmitter();

  currentChat: Chat
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  getChannelName() {
    if (this.currentChannel) {
      return this.currentChannel.name;
    } else {
      return "Приватные чаты";
    }
  }

  onChatOpen(chat: Chat) {
    this.chatOpen.emit(chat);
    this.currentChat = chat;
    console.log(this.currentChat)
  }

  canCreateChat() {
    if (this.currentChannel) {
      const user: User = JSON.parse(this.authService.getUser());
      return this.currentChannel.owner.id === user.id;
    }
    return true;
  }
}

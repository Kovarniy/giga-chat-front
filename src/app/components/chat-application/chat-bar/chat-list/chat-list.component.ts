import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chat} from "../../../../models/Chat";
import {Channel} from "../../../../models/Channel";
import {User} from "../../../../models/user";
import {AuthService} from "../../../../services/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChatType} from "../../../../models/ChatType";
import {ChatService} from "../../../../services/chat.service";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  @Input() chats: Chat[];
  @Input() currentChannel: Channel;

  @Output() chatOpen: EventEmitter<Chat> = new EventEmitter();

  currentChat: Chat;

  addedChat: Chat = {
    name: '',
    chatType: ChatType.PUBLIC
  };

  privateChatUser: User = {
    login: ''
  };

  constructor(private authService: AuthService,
              private modalService: NgbModal,
              private chatService: ChatService,
              private userService: UserService) {
  }

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
    return false;
  }

  onAddChannelChat(addChannelChat) {
    this.modalService.open(addChannelChat, {ariaLabelledBy: 'add-chat-button'})
      .result.then(
      (update: string) => {
        this.addedChat.chatType = ChatType.PUBLIC;
        this.addChat(update);
      },
      (close) => {
        console.log('Окно закрыт ' + close);
      });
  }

  onAddPrivateChat(addPrivateChat) {
    this.modalService.open(addPrivateChat, {ariaLabelledBy: 'add-chat-button'})
      .result.then(
      (update: string) => {
        this.addedChat.chatType = ChatType.PRIVATE;
        this.addedChat.name = null;
        this.addedChat.channel = null;
        this.addChat(update);
      },
      (close) => {
        console.log('Окно закрыт ' + close);
      });
  }

  onChatTypeChange(chatType: string) {
    if (chatType === 'public') {
      this.addedChat.chatType = ChatType.PUBLIC;
    } else {
      this.addedChat.chatType = ChatType.CHANNEL;
    }
  }

  /**
   * Логика добавления нового чата.
   * @param eventName текстовое название события.
   */
  addChat(eventName: String) {
    if (eventName === 'add channel chat') {
      if (!this.addedChat.name || !this.addedChat.chatType || !this.currentChannel) {
        return;
      }
      this.addedChat.channel = this.currentChannel;
      this.createChat();
    } else if (eventName === 'add private chat') {
      if (this.privateChatUser.login) {
        this.userService.getUserByLogin(this.privateChatUser.login).subscribe({
          next: user => {
            if (user) {
              this.addedChat.chatUsers = [{user: user}];
              this.createChat();
            }
          },
          error: err => {
            console.log(err)
            return;
          }
        });
      }
    } else {
      return;
    }
  }

  createChat() {
    this.chatService.createChat(this.addedChat).subscribe({
      next: chat => {
        if (chat) {
          this.chats.push(chat);
          console.log(chat);
        }
      }
    });
  }
}

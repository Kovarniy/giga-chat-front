import {AfterViewChecked, Component, Input, OnInit, ViewChild} from '@angular/core';
import {StompService} from "../../../services/stomp.service";
import {Message} from "../../../models/Message";
import {ChatService} from "../../../services/chat.service";
import {Chat} from "../../../models/Chat";
import {ChatType} from "../../../models/ChatType";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/user";
import {ChannelService} from "../../../services/channel.service";
import {Channel} from "../../../models/Channel";

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit, AfterViewChecked {

  // TODO придумать инциализацию стартового чата
  currentChat: Chat;
  @Input() currentChannel: Channel;
  canUserSendMessage: boolean;

  @ViewChild('scrollMe') myScrollContainer;

  @Input() set changeChat(currentChat: Chat) {
    if (!currentChat) {
      return;
    }
    this.currentChat = currentChat;
    this.subscribeOnChat();
    this.loadMessages();
    this.canUserSendMessage = this.canSendMessage();
  }

  messages: Message[] = [];
  message: string;

  constructor(private stompService: StompService,
              private chatService: ChatService,
              private channelService: ChannelService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscribeOnChat();
    this.loadMessages();
  }

  subscribeOnChat() {
    this.stompService.subscribe(this.currentChat.id, (message) => {
      const _message: Message = JSON.parse(message.body);
      this.messages.push(_message);
    });
  }

  loadMessages() {
    this.chatService.getChatMessages(this.currentChat.id)
      .subscribe((messages) => {
        // TODO возможно тут можно добавить какое-то кэширование сообщений
        this.messages = messages;
      });
  }

  send() {
    if (!this.message) {
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const data: Message = {
      sender: user ? user : null,
      text: this.message.trim(),
      isRead: false,
      chat: {
        id: this.currentChat.id
      }
    };
    this.stompService.send(data);
    this.message = '';
  }

  ngAfterViewChecked() {
    this.scrollToEnd();
  }

  scrollToEnd() {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  canSendMessage() {
    if (this.currentChat.chatType === ChatType.CHANNEL) {
      const user: User = JSON.parse(this.authService.getUser());
      return this.currentChannel.owner.id === user.id;
    }
    return true;
  }

}

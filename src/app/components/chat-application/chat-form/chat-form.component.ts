import {AfterViewChecked, Component, Input, OnInit, ViewChild} from '@angular/core';
import {StompService} from "../../../services/stomp.service";
import {Message} from "../../../models/Message";
import {ChatService} from "../../../services/chat.service";
import {Chat} from "../../../models/Chat";
import {ChatType} from "../../../models/ChatType";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/user";
import {Channel} from "../../../models/Channel";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
    // TODO Причастом переключении между чатами происходит множественная подписка на чат
    // из-за чего сообщение может отправиться не один, а множество раз..
    this.subscribeOnChat();
    this.loadMessages();
    this.canUserSendMessage = this.canSendMessage();
  }

  messages: Message[] = [];
  message: string;

  constructor(private stompService: StompService,
              private chatService: ChatService,
              private modalService: NgbModal,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscribeOnChat();
    this.loadMessages();
  }

  subscribeOnChat() {
    this.stompService.subscribe(this.currentChat.id, (message) => {
      const _message: Message = JSON.parse(message.body);
      ChatFormComponent.updateMessageSenderName(_message);
      if (_message.chat.id === this.currentChat.id) {
        this.messages.push(_message);
      }
    });
  }

  loadMessages() {
    this.chatService.getChatMessages(this.currentChat.id)
      .subscribe((messages) => {
        // TODO возможно тут можно добавить какое-то кэширование сообщений
        for (let message of messages) {
          ChatFormComponent.updateMessageSenderName(message);
        }
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

  /**
   * Каналы нужны только для чтения новостей.
   */
  canSendMessage() {
    if (this.currentChat.chatType === ChatType.CHANNEL) {
      const user: User = JSON.parse(this.authService.getUser());
      return this.currentChannel.owner.id === user.id;
    }
    return true;
  }

  onProfileClick(profile) {
    if(!this.currentChat.friend) {
      return;
    }
    this.modalService.open(profile, {ariaLabelledBy: 'avatar'})
      .result.then(
      () => {
      },
      (close) => {
        console.log('Окно закрыт ' + close);
      });
  }

  private static updateMessageSenderName(message: Message) {
    if (message.chat.chatType === ChatType.CHANNEL) {
      message.sender.name = message.chat.name;
    }
  }
}

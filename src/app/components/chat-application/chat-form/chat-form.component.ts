import {Component, Input, OnInit} from '@angular/core';
import {StompService} from "../../../services/stomp.service";
import {Message} from "../../../models/Message";
import {ChatService} from "../../../services/chat.service";
import {Chat} from "../../../models/Chat";

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {

  // TODO придумать инциализацию стартового чата
  currentChat: Chat;

  @Input() set changeChat(currentChat: Chat) {
    if (!currentChat) {
      return;
    }
    this.currentChat = currentChat;
    // TODO Причастом переключении между чатами происходит множественная подписка на чат
    // из-за чего сообщение может отправиться не один, а множество раз..
    this.subscribeOnChat();
    this.loadMessages();
  }

  messages: Message[] = [];
  message: string;

  constructor(private stompService: StompService,
              private chatService: ChatService) {
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
  }

}

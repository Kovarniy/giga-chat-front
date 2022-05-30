import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chat} from "../../../../models/Chat";

@Component({
  selector: 'app-chat-field',
  templateUrl: './chat-field.component.html',
  styleUrls: ['./chat-field.component.scss']
})
export class ChatFieldComponent implements OnInit {

  chat: Chat;
  @Input() set setChats(chat: Chat) {
    this.chat = chat
    this.chat.name = this.chat.name ? this.chat.name : this.chat.id;
  }

  @Output() chatOpen: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onOpenChat() {
    this.chatOpen.emit(this.chat);
  }

}

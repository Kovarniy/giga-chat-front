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

  constructor() { }

  ngOnInit(): void {
  }

  onChatOpen(event: Chat) {
    console.log(event);
    this.chatOpen.emit(event);
  }
}

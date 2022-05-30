import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chat} from "../../../../models/Chat";

@Component({
  selector: 'app-private-chats',
  templateUrl: './private-chats.component.html',
  styleUrls: ['./private-chats.component.scss']
})
export class PrivateChatsComponent implements OnInit {

  @Input() allChats: Chat[];
  @Output() chatOpen: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChatOpen(event: any) {
    console.log(event);
    this.chatOpen.emit(event);
  }
}

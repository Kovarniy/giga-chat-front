import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chat} from "../../../models/Chat";
import {ChatTypes} from "../../../models/constants/ChatTypes";

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.scss']
})
export class ChatBarComponent implements OnInit {

  @Input() allChats: Chat[];
  @Input() privateChats: Chat[];

  @Output() chatOpen: EventEmitter<any> = new EventEmitter();

  chatTypes = {
    public: 'PUBLIC',
    private: 'PRIVATE',
    channel: 'CHANNEL'
  }

  /**
   * Переключатель для состояния открытых чатов
   */
  chatState: ChatTypes = ChatTypes.privateType;

  constructor() { }

  ngOnInit(): void {
  }

  onPrivateChatClick() {
    this.chatState = ChatTypes.privateType;
    console.log('private chats');
  }

  onPublicChatClick() {
    this.chatState = ChatTypes.publicType;
  }

  onChatOpen(event: any) {
    this.chatOpen.emit(event);
  }
}

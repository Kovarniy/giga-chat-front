import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chat} from "../../../models/Chat";
import {Channel} from "../../../models/Channel";
import {ApiUrls} from "../../../models/constants/ApiUrls";
import {User} from "../../../models/user";

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.scss']
})
export class ChatBarComponent implements OnInit {

  @Input() chats: Chat[];
  @Input() channels: Channel[];
  @Input() currentUser: User;

  @Output() chatOpenEvent: EventEmitter<Chat> = new EventEmitter();
  @Output() channelOpenEvent: EventEmitter<Channel> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onPrivateChatClick() {
    console.log('private chats');
    this.channelOpenEvent.emit(null);
  }

  onChannelClick(channel: Channel) {
    this.channelOpenEvent.emit(channel);
  }

  onChatOpenEvent(event: Chat) {
    this.chatOpenEvent.emit(event);
  }

  getChannelUrl(link: string) {
    return ApiUrls.channelUrl + link;
  }

  getPrivateChatUrl() {
    return ApiUrls.privateChats;
  }
}

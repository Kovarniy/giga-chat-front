import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chat} from "../../../models/Chat";
import {Channel} from "../../../models/Channel";
import {ApiUrls} from "../../../models/constants/ApiUrls";
import {User} from "../../../models/user";
import {ChatService} from "../../../services/chat.service";
import {ChannelService} from "../../../services/channel.service";

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.scss']
})
export class ChatBarComponent implements OnInit {

  chats: Chat[];
  @Input() channels: Channel[];
  @Input() currentUser: User;

  @Output() chatOpenEvent: EventEmitter<Chat> = new EventEmitter();
  @Output() channelOpenEvent: EventEmitter<Channel> = new EventEmitter();

  constructor(private chatService: ChatService,
              private channelService: ChannelService,) {
  }

  ngOnInit(): void {
    this.onPrivateChatClick();
  }

  onPrivateChatClick() {
    this.chatService.getUserPrivateChats()
      .subscribe({
        next: (privateChats: Chat[]) => {
          this.chats = privateChats;
          this.channelOpenEvent.emit(null);
        },
        error: (err => {
          console.log(err);
        })
      });
  }

  onChannelClick(channel: Channel) {
    this.channelService.getChannelChats(channel.id)
      .subscribe({
        next: (channelChats: Chat[]) => {
          this.chats = channelChats;
          this.channelOpenEvent.emit(channel);
        },
        error: (err => {
          console.log(err);
        })
      });
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

import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {Chat} from "../../models/Chat";
import {Channel} from "../../models/Channel";
import {ChannelService} from "../../services/channel.service";
import {Router} from "@angular/router";
import {ApiUrls} from "../../models/constants/ApiUrls";

@Component({
  selector: 'app-chat-application',
  templateUrl: './chat-application.component.html',
  styleUrls: ['./chat-application.component.scss']
})
export class ChatApplicationComponent implements OnInit {

  chats: Chat[];
  channels: Channel[];

  /**
   * Текущий чат
   */
  currentChat: Chat;

  /**
   * хранит состояние 'какой канал открыт'.
   */
  currentChannel: Channel;

  constructor(private chatService: ChatService, private channelService: ChannelService, private router: Router) {
  }

  ngOnInit(): void {
    this.redirectToHome();
    this.loadUserChannels();
    this.loadChats();
  }

  private loadUserChannels() {
    this.channelService.getUserChannels().subscribe({
      next: (userChannels: Channel[]) => {
        this.channels = userChannels;
      },
      error: (err => {
        console.log(err);
      })
    })
  }

  private loadChats() {
    if (this.currentChannel) {
      this.loadCurrentChannelChats();
    } else {
      this.loadPrivateChats();
    }
  }

  private loadCurrentChannelChats() {
    this.channelService.getChannelChats(this.currentChannel.id)
      .subscribe({
        next: (channelChats: Chat[]) => {
          this.chats = channelChats;
          console.log(this.chats)
        },
        error: (err => {
          console.log(err);
        })
      });
  }

  private loadPrivateChats() {
    this.chatService.getUserPrivateChats()
      .subscribe({
        next: (privateChats: Chat[]) => {
          this.chats = privateChats;
        },
        error: (err => {
          console.log(err);
        })
      });
  }

  /**
   * @param chat выбранный чат
   */
  onChatOpen(chat: Chat) {
    console.log('Текущий чат ' + chat.id)
    this.currentChat = chat;
  }

  onChannelOpen(channel: Channel) {
    this.currentChat = null;
    this.currentChannel = channel;
    this.loadChats();
  }

  redirectToHome() {
    this.router.navigate([ApiUrls.privateChats]);
  }
}

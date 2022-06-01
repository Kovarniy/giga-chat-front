import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chat} from "../../../models/Chat";
import {Channel} from "../../../models/Channel";
import {ApiUrls} from "../../../models/constants/ApiUrls";
import {User} from "../../../models/user";
import {ChatService} from "../../../services/chat.service";
import {ChannelService} from "../../../services/channel.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.scss']
})
export class ChatBarComponent implements OnInit {

  @Input() channels: Channel[];
  @Input() currentUser: User;

  @Output() chatOpenEvent: EventEmitter<Chat> = new EventEmitter();
  @Output() channelOpenEvent: EventEmitter<Channel> = new EventEmitter();
  @Output() addChanelEvent: EventEmitter<Channel> = new EventEmitter<Channel>();

  currentChannel: Channel;
  chats: Chat[];
  isAddChanelOpen: boolean = false;

  /**
   * Объект для хранения добавляемого чата
   */
  addedChannel: Channel = {
    about: "",
    name: "",
    owner: undefined
  }

  constructor(private chatService: ChatService,
              private channelService: ChannelService,
              private modalService: NgbModal,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.onPrivateChatClick();
  }

  onPrivateChatClick() {
    // this.channels.push(...this.channels);

    this.chatService.getUserPrivateChats()
      .subscribe({
        next: (privateChats: Chat[]) => {
          this.chats = privateChats;
          this.channelOpenEvent.emit(null);
          this.currentChannel = null;
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
          this.currentChannel = channel;
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

  /**
   * Открытие модалки по нажатию на кнопку для добавление канала
   * @param content
   */
  onAddChannel(content) {
    this.modalService.open(content, {ariaLabelledBy: 'add-channel'})
      .result.then(
      (update: string) => {
        this.addChanel(update);
      },
      (close) => {
        console.log('Чат закрыт ' + close);
      });
  }

  /**
   * Логика добавления чата.
   * @param eventName тектовое название события.
   */
  addChanel(eventName: string) {
    if (eventName !== 'add channel' || !this.addedChannel.name
      || !this.addedChannel.about) {
      return;
    }

    this.addedChannel.owner = JSON.parse(this.authService.getUser());
    this.channelService.createChannel(this.addedChannel)
      .subscribe({
        next: (channel) => {
          if (!channel) {
            return;
          }
          this.addChanelEvent.emit(channel);
          console.log(channel);
        },
        error: (err => {
          console.error(err)
        })
      });
  }
}

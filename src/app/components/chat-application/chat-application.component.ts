import {Component, OnInit} from '@angular/core';
import {Chat} from "../../models/Chat";
import {Channel} from "../../models/Channel";
import {ChannelService} from "../../services/channel.service";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {ApiUrls} from "../../models/constants/ApiUrls";
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {ChatService} from "../../services/chat.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-chat-application',
  templateUrl: './chat-application.component.html',
  styleUrls: ['./chat-application.component.scss']
})
export class ChatApplicationComponent implements OnInit {

  channels: Channel[];

  currentUser: User;

  /**
   * Текущий чат
   */
  currentChat: Chat;

  /**
   * хранит состояние 'какой канал открыт'.
   */
  currentChannel: Channel;

  constructor(private route: ActivatedRoute,
              private channelService: ChannelService,
              private chatService: ChatService,
              private userService: UserService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.joinChannel();
    this.initialApplicationState();
  }

  private initialApplicationState() {
    this.setCurrentUser();
    this.loadUserChannels();
    this.redirectToHome();
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

  /**
   * @param chat выбранный чат
   */
  onChatOpen(chat: Chat) {
    console.log('Текущий чат ' + chat.id)
    this.currentChat = chat;
  }

  redirectToHome() {
    this.router.navigate([ApiUrls.privateChats]);
  }

  /**
   * При открытии приложения обновляем данные о пользователе.
   */
  setCurrentUser() {
    this.currentUser = JSON.parse(this.authService.getUser());
    this.userService.getUser(this.currentUser.id).subscribe({
      next: (user: User) => {
        this.currentUser = user;
        user.token = this.authService.getToken();
        localStorage.setItem('user', JSON.stringify(user))
      }
    });
  }

  onChannelOpen(channel: Channel) {
    this.currentChannel = channel;
  }

  onAddChannel(channel: Channel) {
    this.channels.push(channel);
  }


  private joinChannel() {
    let link = this.route.snapshot.paramMap.get('link');
    console.log(link);
    if (link) {
      this.channelService.joinChannel(link).subscribe({
        next: (channel) => {
          this.channels.push(channel);
        }
      });
    }
  }
}

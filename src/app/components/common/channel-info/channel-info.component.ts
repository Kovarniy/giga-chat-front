import {Component, Input, OnInit} from '@angular/core';
import {Channel} from "../../../models/Channel";
import {ApiUrls} from "../../../models/constants/ApiUrls";
import {User} from "../../../models/user";
import {ChannelService} from "../../../services/channel.service";
import {EnvironmentService} from "../../../services/environment.service";

@Component({
  selector: 'app-channel-info',
  templateUrl: './channel-info.component.html',
  styleUrls: ['./channel-info.component.scss']
})
export class ChannelInfoComponent implements OnInit {

  @Input() channel: Channel;
  @Input() editable: boolean = false;
  @Input() modal: any;

  channelUsers: User[];
  private domain: string;
  channelLink: string;

  constructor(private channelService: ChannelService, private environmentService: EnvironmentService) {

  }

  ngOnInit(): void {
    this.channelService.getChannelUsers(this.channel.id).subscribe({
      next: users => {
        this.channelUsers = users;
      }
    });
    this.domain = this.environmentService.getValue('frontDomain');
    this.setChannelLink();
  }

  setChannelLink() {
    this.channelLink = this.domain + ApiUrls.channelUrl + 'join/' + this.channel.link;
  }
}

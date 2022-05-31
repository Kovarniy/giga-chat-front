import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiUrls} from "../../../models/constants/ApiUrls";
import {EnvironmentService} from "../../../services/environment.service";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() image: any = null;
  @Input() chatName: string;
  @Input() chatUrl: string;

  @Input() avatarSizeState: 'small' | 'standard' = 'standard';

  private domain;

  avatarSizeStateStates = {
    small: 'small',
    standard: 'standard'
  }

  constructor(private router: Router, private environmentService: EnvironmentService) { }

  ngOnInit(): void {
    this.domain = this.environmentService.getValue('domain');
  }

  redirect() {
    this.router.navigate([this.chatUrl])
  }

  getAvatarUrl(imageName: string) {
    return this.domain + ApiUrls.avatarUrl + imageName;
  }
}

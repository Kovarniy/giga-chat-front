import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

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

  avatarSizeStateStates = {
    small: 'small',
    standard: 'standard'
  }

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  redirect() {
    this.router.navigate([this.chatUrl])
  }
}

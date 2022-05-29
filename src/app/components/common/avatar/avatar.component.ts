import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() image: any = null;
  @Input() chatName: string;
  @Input() chatUrl: string;

  constructor() { }

  ngOnInit(): void {
  }

}

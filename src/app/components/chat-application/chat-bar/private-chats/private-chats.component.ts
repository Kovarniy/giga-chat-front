import {Component, Input, OnInit} from '@angular/core';
import {Chat} from "../../../../models/Chat";

@Component({
  selector: 'app-private-chats',
  templateUrl: './private-chats.component.html',
  styleUrls: ['./private-chats.component.scss']
})
export class PrivateChatsComponent implements OnInit {

  @Input() allChats: Chat[];

  constructor() { }

  ngOnInit(): void {
  }

}

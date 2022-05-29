import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../../models/Message";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  message: Message;
  @Input('message') set setMessage(message: Message) {
    this.message = message;
    this.message.isCuttentUserMessage = this.message.sender.login === this.authService.getCurrentUserLogin();
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}

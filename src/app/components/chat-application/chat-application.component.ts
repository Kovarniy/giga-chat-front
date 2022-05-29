import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {Chat} from "../../models/Chat";

@Component({
  selector: 'app-chat-application',
  templateUrl: './chat-application.component.html',
  styleUrls: ['./chat-application.component.scss']
})
export class ChatApplicationComponent implements OnInit {

  userChats: Chat[];

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatService.getUserChats()
      .subscribe({
        next: (userChats: Chat[]) => {
          this.userChats = userChats;
        },
        error: (err => {
          console.log(err);
        })
      })
  }


}

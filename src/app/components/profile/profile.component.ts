import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() user: User;
  @Input() editable: boolean = false;
  @Input() modal: any;

  constructor() {
  }

  ngOnInit(): void {

  }


}

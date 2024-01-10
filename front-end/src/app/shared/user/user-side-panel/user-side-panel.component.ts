import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './user-side-panel.component.html',
  styleUrls: ['./user-side-panel.component.scss']
})
export class UserSidePanelComponent {
  constructor(
    public userService: UserService
  ) { }
}

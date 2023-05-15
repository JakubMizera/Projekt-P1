import { Component } from '@angular/core';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {
  userName = 'Test Username';
  searchQuery?: string;

  onSearch() {
    console.log(`Query: ${this.searchQuery}`);
  }
}

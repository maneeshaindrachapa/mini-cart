import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Item } from '../../models/item.model';
import { Page } from '../../models/page';
import { SavedItem } from '../../models/savedItem.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/services/user.service';
import { UsersService } from '../users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  sortValues: string[] = ['firstname', 'lastname', 'email', 'role'];
  page = 0;
  size = 15;
  sortValue: string = this.sortValues[0];
  direction = 'asc';
  users: any;
  savedItems: SavedItem[];

  constructor(public userService: UsersService, private router: Router, private route: ActivatedRoute) {
  }
  delete(userId: number) {
    this.userService.deleteUser(userId).subscribe(data => {
      this.sort();
    });
  }
  ngOnInit() {
    this.userService.findSortedAndPaginatedUsers(this.page, this.size, this.sortValue, this.direction).subscribe(data => {
      this.users = data.rows;
    });

  }

  onSort(sort: { value: string, direction: string }) {
    this.sortValue = sort.value;
    this.direction = sort.direction;
    this.sort();
  }

  onPaginate() { this.sort(); }
  sort() {
    this.userService.findSortedAndPaginatedUsers(this.page, this.size, this.sortValue, this.direction).subscribe(data => {
      this.users = data.rows;
    });
  }

}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {
  user: User = new User();


  constructor(public usersService: UsersService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();

  }
  getUser() {
    this.usersService.getUserById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(data => {
      this.user = data;
    });
  }
  updateUser() {
    this.usersService.updateUser(this.user).subscribe(data => {
      this.user = data;
    });
  }

}

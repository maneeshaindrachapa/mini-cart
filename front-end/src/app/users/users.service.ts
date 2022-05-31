import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Page } from "../models/page";
import { Observable } from "rxjs";
import { ItemTransactionRequest } from "../models/itemTransactionRequest.model";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(@Inject('BASE_API_URL',) private baseUrl: string, private http: HttpClient,
    private activatedRoute: ActivatedRoute, private router: Router) {
  }

  public findSortedAndPaginatedUsers(page: number, size: number, sort: string, direction: string) {
    return this.http.get<any>(this.baseUrl + '/user?page=' + page + '&size=' + size + '&sort=' + sort + '&direction=' + direction);
  }

  public deleteUser(userID: number) {
    return this.http.delete(this.baseUrl + '/user/' + userID);
  }

  public getUserById(userID: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/user/' + userID);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + '/user', user);
  }

  goToUpdateUser(userID: number) {
    this.router.navigate(['home', { outlets: { nav: ['update-user', userID] } }]);
  }
}

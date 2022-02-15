import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService implements OnDestroy {

  private requestUrl: string;

  private _userData: BehaviorSubject<Array<User>>;
  latestUserData$: Observable<Array<User>>;

  private subscription: Subscription;

  constructor(
    private _http: HttpClient
  ) {
    this.requestUrl = '/api/user';

    this._userData = new BehaviorSubject<Array<User>>([]);
    this.latestUserData$ = this._userData.asObservable();

    this.subscription = new Subscription();
  }

  getUsers(caller: string): void {
    let response$ = this._http.get<Array<User>>(this.requestUrl);

    this.subscription.add(
      response$.subscribe((data) => {
        this._userData.next(data);
      }, error => {

      })
    );
  }

  createUser(user: User): void {
    let response$ = this._http.post<Array<User>>(this.requestUrl, user);

    this.subscription.add(
      response$.subscribe((data) => {
        data ? this.getUsers('CreateUser') : '';
      }, error => {

      })
    );
  }

  editUser(user: User): void {
    let response$ = this._http.put(this.requestUrl + user.id, user);

    this.subscription.add(
      response$.subscribe((data) => {
        data ? this.getUsers('UpdateUser') : '';
      }, error => {

      })
    );
  }

  deleteUser(id: number): void {
    let response$ = this._http.delete(this.requestUrl + id);

    this.subscription.add(
      response$.subscribe((data) => {
        data ? this.getUsers('DeleteUser') : '';
      }, error => {

      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this._userData.complete();
  }
}

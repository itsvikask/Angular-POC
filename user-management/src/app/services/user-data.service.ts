import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

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

  getUsers(): void {
    let response$ = this._http.get<Array<User>>(this.requestUrl);

    console.log("API to get all users");

    this.subscription.add(
      response$.subscribe((data) => {
        console.log(data);
        this._userData.next(data);
      }, error => {

      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this._userData.complete();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserDataService } from 'src/app/services/user-data.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  allUsers: User[];

  displayedColumns: string[] = ['id', 'username', 'role'];
  dataSource: MatTableDataSource<User>;

  private subscription: Subscription;

  constructor(
    private _userDataService: UserDataService
  ) {
    this.subscription = new Subscription();
    this.dataSource = new MatTableDataSource<User>();
  }

  ngOnInit(): void {

    this.subscription.add(
      this._userDataService.latestUserData$.subscribe((users) => {
        this.allUsers = users;
        this.dataSource.data = this.allUsers;
      })
    );

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

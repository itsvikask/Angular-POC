import { Injectable } from '@angular/core';
import { USER_DATA } from 'src/app/models/data/user.data';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService {

  constructor() { }

  createDb() {
    return {
      user: USER_DATA
    }
  }

  genId<T extends User>(data: T[]): number {
    return data.length > 0 ? Math.max(...data.map(t => t.id)) + 1 : 1;
  }
}

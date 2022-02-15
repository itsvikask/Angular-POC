import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  constructor(
    private router: Router
  ) { }

  canActivate(router: ActivatedRouteSnapshot): boolean {
    return true;
  }
}

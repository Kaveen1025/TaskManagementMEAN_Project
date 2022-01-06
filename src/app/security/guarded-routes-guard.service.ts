import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GuardedRoutesGuard implements CanActivate {
  constructor() {
  }

  canActivate(): boolean {
    return false;
  }

}

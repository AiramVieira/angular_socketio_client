import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { isArray } from 'util';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }

  public goHome(): void {
    this.router.navigate(['/servicos_programados']);
  }
  public goHomeClient(): void {
    this.router.navigate(['/comunicacao']);
  }
  public goToLogin(): void {
    this.router.navigate(['/login']);
  }
}

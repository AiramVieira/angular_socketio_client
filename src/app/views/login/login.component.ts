import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService, StorageService } from 'src/app/services/services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  exportAs: 'LoginViewComponent'
})
export class LoginViewComponent implements OnInit {

  public returnToUrl: string;

  public isLoading: boolean;

  public username: string;
  public password: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private storageService: StorageService) {
  }

  public login(username: string = this.username, password: string = this.password): void {
    const credentials = { email: `${username}`, password: `${password}` };
    this.authService.token(credentials).subscribe((response: any) => {
      if (response.status === 'success') {
        // saves the user in memory.
        this.storageService.put('user', response.record.user);

        // saves the token in memory
        this.storageService.put('token', response.record.token);

        // 
        this.router.navigate([this.returnToUrl]);
      } else {
        alert('Login failed! Invalid email or password');
      }
    });
  }

  public ngOnInit() {
    this.returnToUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}

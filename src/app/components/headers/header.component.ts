import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/services';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public currentUser: any;

  constructor(private wsAuth: AuthService,
              private route: ActivatedRoute,
              private storageService: StorageService) {
    this.currentUser = this.storageService.get('user');
  }

  public ngOnInit() { }

}

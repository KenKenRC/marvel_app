import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnDestroy {

  userLoginOn: boolean = false;

  constructor(private service: ApiService, private route: Router) { }

  ngOnDestroy(): void {
    this.service.currentUser.unsubscribe();
  }

  ngOnInit(): void {
    this.service.currentUser.subscribe(
      {
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
          if (!this.userLoginOn) {
            this.route.navigateByUrl('/login');
          }
        }
      })
  }

  logOut() {
    this.service.currentUser.next(false);
    this.route.navigateByUrl('/login');
  }

}

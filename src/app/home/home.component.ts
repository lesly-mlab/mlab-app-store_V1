import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user: any;
  constructor(private _service: AppService, private _router: Router) { }

  ngOnInit() {
    this.user = this._service.getUserSession();
    if (!this.user) {
      this._router.navigate(["/"])
    }
  }

  logout(){
    this._service.logout();
    this._router.navigate(["/"]);

  }

}

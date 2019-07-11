import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public user: any;
  constructor(private _service: AppService, private _router: Router) { }

  ngOnInit() {
    this.user = this._service.getUserSession();
    if (!this.user) {
      this._router.navigate(["/"])
    } else {
      if (this.user.role != "Admin"){
        this._router.navigate(["/home"])
      }
    }
  }

  logout(){
    this._service.logout();
    this._router.navigate(["/"]);

  }

}

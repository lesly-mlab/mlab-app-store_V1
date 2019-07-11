import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NgForm } from '@angular/forms';
// import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = null;
  password = null;

  loginForm: FormGroup;
  submitted = false;

  loader = false;

  loginStatus = null;

  constructor(private _service: AppService, private _router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    let ref = this._service.getUserSession()
    if (ref) {
      if (ref.role == "Admin") {
        this._router.navigate(["/admin"])
      } else {
        this._router.navigate(["/home"])
      }
    }

    //Login Validations
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  login(): void {

    this.loader = true;

    this._service.getSigninUser(this.username, this.password).subscribe(res => {
      if (res) {
        let usr: any = res;
        this.loginStatus = "SUCCESS!!";
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
        this.loader = false;
        this._service.getUser(usr.uid).subscribe(ref => {


          let logUsr: any = ref;
          this._service.userSession(ref);
          if (logUsr.role == "Admin") {
            this._router.navigate(["/admin"])
          } else {
            this._router.navigate(["/home"])
          }
        });
      }
    }, err => { 
      this.loader = false;
      // alert('Email or Password ivalid!! :-)\n\n' + JSON.stringify(this.loginForm.value)) 
      this.loginStatus = "Email or Password ivalid!!";
    }
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
  }


}

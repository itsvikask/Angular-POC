import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private userDataService: UserDataService
  ){

  }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  private initializeLoginForm(){
    this.loginForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  validateUser(){
    this.userDataService.getUsers();
    this._router.navigate(['home']);
  }

}

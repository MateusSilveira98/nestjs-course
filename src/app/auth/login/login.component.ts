import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../auth.service";
import { tap } from "rxjs/operators";
import { noop } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) {

    this.form = fb.group({
      email: ['student@angular-university.io', [Validators.required]],
      password: ['password', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    const email = this.form.controls.email.value;
    const password = this.form.controls.password.value;
    this.auth.login(email, password).subscribe(
      (reply: any) => {
        localStorage.setItem('authJwtToken', reply.authJwtToken);
        this.router.navigateByUrl('/courses');
      },
      (error) => alert(JSON.stringify(error)),
    );
  }

}


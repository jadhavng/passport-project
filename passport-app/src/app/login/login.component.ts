import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm! : FormGroup;

  constructor(
  private fb: FormBuilder
  ){}

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
     this.loginForm = this.fb.group({
        email : ['', [Validators.required, Validators.email]],
        password : ['', Validators.required]
     })
  }
}

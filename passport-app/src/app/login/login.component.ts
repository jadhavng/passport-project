import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataStoreServiceService } from '../DataServices/data-store-service.service';
import { DataAccessServiceService } from '../DataServices/data-access-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm! : FormGroup;
  

  constructor(
  private fb: FormBuilder,
  private loginService: DataAccessServiceService,
  private router : Router
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

  onSubmit(){
      if(this.loginForm.valid){
        const {email, password} = this.loginForm.value;

        this.loginService.login(email, password).subscribe({
          next: (user) => {
            if (user) {
              // Handle successful login
              alert('login successfully')
              this.router.navigate(['/dashboard']); // Adjust navigation as needed
            } else {
              // Handle login error
              alert('Login failed. Please check your credentials and try again.');
            }
          },
          error: (error) => {
            // Handle HTTP error
            console.error('Login error', error);
            alert('An error occurred. Please try again later.');
          }   
      })
      }
  }

  
}

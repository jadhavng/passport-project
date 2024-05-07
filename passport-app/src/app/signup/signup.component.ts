import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DataStoreServiceService } from '../DataServices/data-store-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {


    signUpForm! : FormGroup;
    formErrors : any;

    constructor(
      private fb : FormBuilder,
      private dataStore : DataStoreServiceService,
      private router : Router
      
    ){
      this.formErrors = {};
    }

    ngOnInit() {
      this.buildForm();
    }

    buildForm(){
      this.signUpForm = this.fb.group({
          firstName : ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
          lastName : ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
          email: ['', [Validators.required, Validators.email]],
          phoneNumber: [
            '',
            [Validators.required],
          ],
          gender: ['', Validators.required],
          dateOfBirth: [
            '',
            [Validators.required, this.dateNotInFutureValidator()],
          ],
          aadharNo: [
            '',
            [
              Validators.required,
              // Custom validator for numeric input
              // Validators.minLength(12),
              // Validators.maxLength(12),
              this.numericFieldValidator(12)
            ],
          ],
          password: ['', Validators.required],
          confirmPassword: [
            '',
            [Validators.required],
          ],
      });

      this.signUpForm.valueChanges.subscribe((data) => {
        this.validateForm();
      });
      
    }

    validateForm(){
      this.formErrors ={};

      for(const field in this.signUpForm.controls){
         //Checking field is own property of object not inherited property
         if(this.signUpForm.controls.hasOwnProperty(field)){
          const control = this.signUpForm.get(field);

          if(control && !control.valid && (control.dirty || control.touched)){
             const messages  = this.validationMessages[field]
             //concatnating multiple error
             for(const key in control.errors){
              if(!this.formErrors[field]){
                this.formErrors[field] = '';
              }

              this.formErrors[field] += messages[key] + ' ';
             }
          } 
         }
      }
    }

   onSubmit (){
       if(this.signUpForm.valid){
         const formData = this.signUpForm.value;
         //Storing data in database
         this.dataStore.postData(formData).then((data)=>{
          alert('Registered successfully..');
          this.signUpForm.reset();
          // Routing to login page
          this.router.navigate(['login']);
         })
       }else{
         this.validateForm();
       }
    }

    //Validation error message to dyanyamicaly fetch error message from model.  
    validationMessages: { [key: string]: { [key: string]: string } } = {
      firstName: {
        required: 'First Name is required.',
        pattern: 'Should contains only alphabets',
      },
      lastName: {
        required: 'Last Name is required.',
        pattern: 'Should contains only alphabets',
      },
      email: {
        required: 'Email is required.',
        email: 'Please enter a valid email address.',
      },
      phoneNumber: {
        required: 'Phone Number is required.',
        invalidNo: 'Phone Number contains only 10 digits',
      },
      gender: {
        required: 'Gender is required.',
      },
      dateOfBirth: {
        required: 'Date of Birth is required.',
        futureDate: 'Date of Birth cannot be a future date.',
      },
      aadharNo: {
        required: 'Aadhar No is required.',
        invalidNo: 'Aadhar No contains 12 digits',
        // minLength: 'Aadhar No should be 12 digits long.',
        // maxLength: 'Aadhar No should be 12 digits long.',
      },
      password: {
        required: 'Password is required.',
      },
      confirmPassword: {
        required: 'Confirm Password is required.',
        passwordMismatch: 'Passwords do not match.',
      },
      image: {
        invalidFormat:
          'Invalid image format. Only JPG and PNG formats are allowed.',
      },
    };

    //custome validator for Validate date 
    dateNotInFutureValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const selectedDate = new Date(control.value);
        const currentDate = new Date();
  
        if (selectedDate > currentDate) {
          return { futureDate: true };
        }
  
        return null;
      };
    }
     //custome validator for length validator 
     numericFieldValidator(maxLength: number): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        const pattern = new RegExp(`^[0-9]{${maxLength}}$`);
        const valid = pattern.test(value);
  
        return valid ? null : { invalidNo: true };
      };
    }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { RegisterRequest } from 'src/app/services/auth/registerRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerError:String="";
  userLoginOn:boolean=false;
  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    country: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,private router:Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.userLoginOn.subscribe(
      {
        next:(userLoginOn)=>{
          this.userLoginOn=userLoginOn;
        }
      }
    )
  }

  get username(){
    return this.registerForm.controls.username;
  }

  get password(){
    return this.registerForm.controls.password;
  }

  get firstname(){
    return this.registerForm.controls.firstname;
  }
  
  get lastname(){
    return this.registerForm.controls.lastname;
  }

  get country(){
    return this.registerForm.controls.country;
  }

  register() {
    if (this.registerForm.valid) {
      this.loginService.register(this.registerForm.value as RegisterRequest).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigateByUrl('/iniciar-sesion');
          this.registerForm.reset();
          },
        error: (err) => {
          console.error(err);
          this.registerError=err;
        }
      });
    }
  }
}

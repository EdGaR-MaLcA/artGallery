import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError:String="";
  userLoginOn:boolean=false;
  loginForm=this.formBuilder.group({
    username:['edgar@gmail.com', [Validators.required, Validators.email]],
    password:['', Validators.required],
      })

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService) { }

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
    return this.loginForm.controls.username;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe(
        {
          next: (authResponse)=>{
            console.log(authResponse);

            const token = authResponse.token;
                    
                    // Aquí accedemos al token del objeto userData y lo almacenamos en el local storage
                    localStorage.setItem('access_token', authResponse.token);

                    this.loginService.setUserData(authResponse.user);

                    // Redirigir a la página de dashboard
                    this.router.navigateByUrl('/dashboard');
                    
                    // Restablecer el formulario
                    this.loginForm.reset();
        },
        error: (err)=>{
            console.error(err);
            this.loginError=err;
        },
        complete: ()=>{
          console.log("Peticion completa");
        }
      } 
      );
    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos");
    }
  }

}

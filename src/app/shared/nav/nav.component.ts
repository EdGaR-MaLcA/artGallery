import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserDetails } from 'src/app/services/auth/userDetails';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginOn:boolean = false;
  userDetails: UserDetails | null = null;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn)=>{
          this.userLoginOn=userLoginOn;
          if (userLoginOn) {
            this.loginService.getUserData().subscribe((userData) => {
              this.userDetails = userData;
            });
          }
        }
      });
    }
  
    isAdminUser(): boolean {
      return this.userDetails?.role === 'ADMIN';
    }

    logout(): void {
      this.loginService.logout();
      this.router.navigate(['/inicio']);
    }
  }
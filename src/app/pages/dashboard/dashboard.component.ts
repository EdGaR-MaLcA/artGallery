import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserDetails } from 'src/app/services/auth/userDetails';
import { Picture } from 'src/app/services/picture/model/picture';
import { PictureService } from 'src/app/services/picture/picture.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    userData: UserDetails | null = null;
    userLoginOn:boolean=false;
    pictures: Picture[] = [];
    hasVoted: boolean = false;
    votedMessage: string = "Ya has votado y no puedes votar nuevamente.";

    constructor(private loginService: LoginService, private pictureService: PictureService, private http: HttpClient) { }

    ngOnInit(): void {
      this.loginService.currentUserLoginOn.subscribe((userLoginOn) => {
        this.userLoginOn = userLoginOn;
        if (userLoginOn) {
          this.loginService.getUserData().subscribe((userData) => {
            this.userData = userData;
            const token = localStorage.getItem('access_token');
            if (token) {
              this.fetchPictures(token);
            }
          });
        }
      });
    }
  

      fetchPictures(token: string) {
        if (token) {
          this.pictureService.getAllPictures(token).subscribe((pictures) => {
            this.pictures = pictures;
          });
        }
      }

      vote(pictureId: number) {
        const token = localStorage.getItem('access_token');
        if (token) {
          if (this.userData?.status === 'APTO') {
            this.pictureService.voteForPicture(pictureId, token).subscribe((votedPicture) => {
              const index = this.pictures.findIndex(image => image.id === votedPicture.id);
              if (index !== -1) {
                this.pictures[index] = votedPicture;
                this.userData!.status = 'NOAPTO'; // Cambia el estado a NOAPTO después de votar
                localStorage.setItem('user_status', 'NOAPTO');
                this.hasVoted = true;
              }
            });
          } else {
            this.hasVoted = true;// Mostrar mensaje al usuario indicando que ya votó y no puede votar nuevamente
          }
        }
      }
    }
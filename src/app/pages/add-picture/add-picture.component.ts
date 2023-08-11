import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PictureService } from 'src/app/services/picture/picture.service';

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.css']
})
export class AddPictureComponent implements OnInit {
  addPictureForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private pictureService: PictureService,
    private router: Router
  ) {
    this.addPictureForm = this.formBuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      city: ['', Validators.required],
      url: ['', Validators.required],
      description: ['']
    });
  }
  
  ngOnInit(): void {
  }

  add() {
      if (this.addPictureForm.valid) {
      const token = localStorage.getItem('access_token');
      if (token) {
        const newPicture = this.addPictureForm.value;
        this.pictureService.createPicture(newPicture, token).subscribe(
          (createdPicture) => {
            
            this.addPictureForm.reset();
            this.showAlert('Picture publicada con éxito', 'success');
          },
          (error) => {
            // Handle error
            console.error(error);
            this.showAlert('Error al publicar la imagen', 'error');
          }
        );
      }
    } else {
      console.error('Invalid form');
      this.showAlert('Debe ingresar todos los campos', 'warning');
    }
  }
  showAlert(message: string, type: 'success' | 'error' | 'warning') {
    const alertElement = document.getElementById('alert');
    if (alertElement) {
      alertElement.textContent = message;
      alertElement.classList.add(type);
      setTimeout(() => {
        alertElement.textContent = '';
        alertElement.classList.remove(type);
      }, 3000); // La alerta desaparecerá después de 3 segundos
    }
  }
}

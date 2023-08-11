import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { Picture } from 'src/app/services/picture/model/picture';
import { PictureService } from 'src/app/services/picture/picture.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

declare var google: any;


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  pictures: Picture[] = [];
  userLoginOn:boolean=false;

  displayedColumns: string[] = ['title', 'artist', 'votes'];
  dataSource = new MatTableDataSource<Picture>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pictureService: PictureService, private loginService: LoginService) { }

  ngOnInit(): void {
    const authToken = localStorage.getItem('access_token'); // Obtener el token del localStorage
    if (authToken) {
      this.loginService.currentUserLoginOn.subscribe((userLoginOn) => {
        this.userLoginOn = userLoginOn;
      });
      this.pictureService.getAllPictures(authToken).subscribe(
        (pictures: Picture[]) => {
          this.pictures = pictures;
          this.dataSource.data = this.pictures;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          google.charts.load('current', { packages: ['corechart'] }); // Cargar Google Charts
          google.charts.setOnLoadCallback(() => this.drawChart()); // Corrección aquí
      },
      error => {
        console.error('Error fetching pictures:', error);
      }
    );
    
  } else {
    console.error('Token not found in localStorage.');
  }
}

  drawChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Artista');
    data.addColumn('number', 'Votos');

    this.pictures.sort((a, b) => parseInt(b.votes) - parseInt(a.votes));

    // Rellenar los datos del gráfico
    this.pictures.slice(0, 5).forEach(picture => {
      if (parseInt(picture.votes) > 0) {
        data.addRow([picture.artist, parseInt(picture.votes)]);
      }
    });

    const options = {
      title: 'Votos por Artista',
      width: 600,
      height: 400,
      legend: { position: 'top' }
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { VotacionComponent } from './pages/votacion/votacion.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddPictureComponent } from './pages/add-picture/add-picture.component';
import { ResultsComponent } from './pages/results/results.component';

const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent},
  { path: 'votation', component: VotacionComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'iniciar-sesion', component: LoginComponent},
  { path: 'registro', component: RegisterComponent},
  { path: 'add-picture', component: AddPictureComponent},
  { path: 'results', component: ResultsComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

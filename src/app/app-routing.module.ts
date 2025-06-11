import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InteractiveMapComponent } from './components/interactive-map/interactive-map.component';
import { DataEntryComponent } from './components/data-entry/data-entry.component';
import { StatistiquesComponent } from './components/statistiques/statistiques.component';
import { ParametresComponent } from './components/parametres/parametres.component';
import { ElectricDataEntryComponent } from './components/electric-data-entry/electric-data-entry.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'interactive-map', component: InteractiveMapComponent },
  { path: 'data-entry', component: DataEntryComponent },
  { path: 'electric-data-entry', component: ElectricDataEntryComponent },
  { path: 'statistiques', component: StatistiquesComponent },
  { path: 'parametres', component: ParametresComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { allIcons } from 'angular-feather/icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MapComponent } from './components/map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { InteractiveMapComponent } from './components/interactive-map/interactive-map.component';
import { DataEntryComponent } from './components/data-entry/data-entry.component';
import { ListeRegionsComponent } from './components/liste-regions/liste-regions.component';
import { ListePrefecturesComponent } from './components/liste-prefectures/liste-prefectures.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { StatistiquesComponent } from './components/statistiques/statistiques.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListeSousPrefecturesComponent } from './components/liste-sous-prefectures/liste-sous-prefectures.component';
import { ListeVillagesComponent } from './components/liste-villages/liste-villages.component';
import { ParametresComponent } from './components/parametres/parametres.component';
import { SourceFinancementComponent } from './components/source-financement/source-financement.component';
import { ElectricDataEntryComponent } from './components/electric-data-entry/electric-data-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    MapComponent,
    InteractiveMapComponent,
    DataEntryComponent,
    ListeRegionsComponent,
    ListePrefecturesComponent,
    StatistiquesComponent,
    ListeSousPrefecturesComponent,
    ListeVillagesComponent,
    ParametresComponent,
    SourceFinancementComponent,
    ElectricDataEntryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Durée d'affichage en ms
      positionClass: 'toast-top-right', // Position
      preventDuplicates: true, // Empêche les doublons
    }),
    FeatherModule.pick(allIcons),
    ScrollToModule.forRoot(),
    CarouselModule,
    HttpClientModule,
    NgChartsModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { ContentComponent } from './content/content.component';
import { MapsComponent } from './maps/maps.component';
import { ListComponent } from './list/list.component';


import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { StoreService } from './services/store.service';
import { AppRoutingModule } from './app-routing.module';
import { InputdataComponent } from './inputdata/inputdata.component';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentComponent,
    MapsComponent,
    ListComponent,
    InputdataComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule
  ],
  providers: [AuthService, StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }

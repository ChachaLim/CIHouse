import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';
import { MapsComponent } from './maps/maps.component';
import { ListComponent } from './list/list.component';
import { InputdataComponent } from './inputdata/inputdata.component';
import { DetailComponent } from './detail/detail.component';


//angular-firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { DropZoneDirective } from './drop-zone.directive';

//Exports modules
import { AppRoutingModule } from './app-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';

//Services
import { AuthService } from './services/auth.service';
import { StoreService } from './services/store.service';
import { ConfirmPaymentComponent } from './confirm-payment/confirm-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentComponent,
    MapsComponent,
    ListComponent,
    InputdataComponent,
    DetailComponent,
    ConfirmPaymentComponent,
    DropZoneDirective,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [AuthService, StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }

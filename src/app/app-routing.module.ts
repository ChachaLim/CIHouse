import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


//Components
import { ContentComponent } from './content/content.component';
import { InputdataComponent } from './inputdata/inputdata.component';
import { DetailComponent } from './detail/detail.component';
import { ConfirmPaymentComponent } from './confirm-payment/confirm-payment.component';
import { UserReserveComponent } from './user-reserve/user-reserve.component';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component:  ContentComponent},
  {path: 'input', component: InputdataComponent},
  {path: 'user-reserve', component: UserReserveComponent},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'confirm/:id', component: ConfirmPaymentComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }

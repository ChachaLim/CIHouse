import { StoreService } from './../services/store.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { House } from '../models/House';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {  
  house:House;
  myForm: FormGroup;
  reservationModalRef: BsModalRef;
  paymentModalRef: BsModalRef;
  price:number;
  guests:number=1;
  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private location: Location) {
      this.getHouse();
    }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      range: null
    });
  }

  getHouse(){
    const id = this.route.snapshot.params.id;
    this.storeService.getHouse(id).subscribe(res=>{console.log(res); this.house = res;});    
  }
  openReservationModal(template: TemplateRef<any>) {
    this.reservationModalRef = this.modalService.show(template);
  }
  openPaymentModal(template: TemplateRef<any>) {
    this.paymentModalRef = this.modalService.show(template, {class:'modal-lg'});
  }
  paymentAgreement(){
    this.reservationModalRef.hide();
    this.paymentModalRef.hide();
    
    //예약 추가 문구
    this.storeService.addReservation(this.house);
    //this.router.navigateByUrl(reservationId);
  }

}






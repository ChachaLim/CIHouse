import { StoreService } from './../services/store.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { House } from '../models/House';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable } from 'rxjs/Observable';
import { Reserve } from '../models/Reservation';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  house: House;
  myForm: FormGroup;
  reservationModalRef: BsModalRef;
  paymentModalRef: BsModalRef;
  price: number;
  id;
  currentUID;
  reserve: Reserve = {
    start: '',
    end: '',
    name: '',
    guests: 1,
    houseID: '',
    guestUID: '',
  };
  isYours = false;

  reservations: Observable<String[]>;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private authServive: AuthService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private location: Location
  ) {
    this.getHouse();
    this.authServive.getCurrentUser().subscribe( user => {
      if (user) {
        this.currentUID = user.uid;
        this.reserve.guestUID = user.uid;
        this.reserve.name = user.displayName;
      } else {

      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(x => {
      this.id = x['id'];
      this.reserve.houseID = this.id;
    });

    this.myForm = this.formBuilder.group({
      range: null
    });
  }

  getHouse() {
    const id = this.route.snapshot.params.id;

    this.storeService.getHouse(id).subscribe(res => {
      console.log(res);
      this.house = res;
      // console.log('crntUID : ' + this.currentUID);
      // console.log('hostUID : ' + res.hostUID);
      if (this.currentUID === res.hostUID) {
        this.isYours = true;
      }
    });
  }
  openReservationModal(template: TemplateRef<any>) {
    this.reservationModalRef = this.modalService.show(template);
  }
  openPaymentModal(template: TemplateRef<any>) {
    this.paymentModalRef = this.modalService.show(template, {class: 'modal-lg' });
  }
  paymentAgreement() {
    this.paymentModalRef.hide();
    this.reservationModalRef.hide();

    this.reservationModalRef = null;
    this.paymentModalRef = null;

    // 예약 추가 문구
    // this.storeService.addReservation(this.house);
    if (this.myForm.value.range[0]) {
      this.reserve.start = String(this.myForm.value.range[0]).substr(0, 15);
      this.reserve.end = String(this.myForm.value.range[1]).substr(0, 15);
    }
    console.log(this.reserve);
    this.storeService.addReserve(this.id, this.reserve);

    this.router.navigateByUrl('/main');
  }

  // 수정하기 버튼
  modHouse() {
    console.log('수정하기!');
    this.router.navigate(['/modHouse', this.id]);
  }

}






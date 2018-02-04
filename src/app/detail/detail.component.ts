import { StoreService } from './../services/store.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { House } from './../models/House';
import { Reserv } from './../models/Reservation';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id;
  currentUID;
  house: House = {
    houseName: '',
    hostName: '',
    path: '',
    price: '',
    address: '',
    id: '',
  };

  reservation: Reserv = {
    start: '',
    end: '',
    name: '',
    hmp: ''
  };
  reservations: Observable<String[]>;
  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private authService: AuthService,
    private location: Location
  ) {
    this.authService.getCurrentUser().subscribe( user => {
      if (user) {
        this.currentUID = user.uid;
        this.reservation.name = user.displayName;
      } else {

      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(x => {
      this.id = x['id'];
      this.storeService.getHouse(this.id).subscribe( house => {
        console.log(house);
        this.house.address = house['address'];
        this.house.price = house['price'];
        this.house.hostName = house['hostName'];
        this.house.houseName = house['houseName'];
        this.house.path = house['path'];
      });
      this.reservations = this.storeService.getReservation(this.id);
    });

  }

}

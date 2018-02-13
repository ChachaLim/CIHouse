import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-reserve',
  templateUrl: './user-reserve.component.html',
  styleUrls: ['./user-reserve.component.css']
})
export class UserReserveComponent implements OnInit {

  reservations=[{
    start:'2017-12-06',
    end:'2017-12-08',
    houseName:'신나는 나의 라이프',
    guests:4
  },{
    start:'2017-12-06',
    end:'2017-12-08',
    houseName:'신나는 나의 라이프',
    guests:4
  },{
    start:'2017-12-06',
    end:'2017-12-08',
    houseName:'신나는 나의 라이프',
    guests:4
  },{
    start:'2017-12-06',
    end:'2017-12-08',
    houseName:'신나는 나의 라이프',
    guests:4
  },{
    start:'2017-12-06',
    end:'2017-12-08',
    houseName:'신나는 나의 라이프',
    guests:4
  }]
  constructor() { }

  ngOnInit() {
  }

}

/*
import { House } from './../models/House';
import { Observable } from 'rxjs/Observable';
import { StoreService } from './../services/store.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Reserve } from '../models/Reservation';

@Component({
  selector: 'app-user-reserve',
  templateUrl: './user-reserve.component.html',
  styleUrls: ['./user-reserve.component.css']
})
export class UserReserveComponent implements OnInit {
  currentUID;
  reservations: Observable<Reserve[]>;
  constructor(private auth: AuthService, private db: StoreService) {
    this.auth.getCurrentUser().subscribe( u => {
      this.currentUID = u.uid;
      console.log(u.uid);
      this.reservations = this.db.getReservations(u.uid);
    });
  }

  ngOnInit() {
  }

}
*/
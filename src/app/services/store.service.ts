import { Reserve } from './../models/Reservation';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { House } from './../models/House';



@Injectable()
export class StoreService {
  private housesDoc: AngularFirestoreDocument<House>;
  private housesCollection: AngularFirestoreCollection<House>;
  private positionsCollection: AngularFirestoreCollection<any>;
  private reservationsCollection: AngularFirestoreCollection<Reserve>;
  house: Observable<House[]>;
  reservation: Observable<String[]>;
  position: Observable<any[]>;
  constructor(private afs: AngularFirestore) {
    this.housesCollection = this.afs.collection<House>('Houses');
    this.positionsCollection = this.afs.collection<any>('Positions');
    this.reservationsCollection = this.afs.collection<Reserve>('Reserv');
  }

  addHouse(house: House) {
    this.housesCollection.add(house);
  }

  getHouses() {
    // constructor에서 선언되어 있으면 라우트 변경시 로딩이 안되는 버그가 생긴다.
    return this.house = this.housesCollection.snapshotChanges().map( changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as House;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getHouse(id: string) {
    return this.housesCollection.doc(`${id}`).valueChanges();
  }

  // getReservation(id) {
  //   this.reservationsCollection = this.afs.collection(`Houses/${id}/reservation`);
  //   this.reservation = this.reservationsCollection.valueChanges();
  //   return this.reservation;
  // }

  addReserve(id, reserve) {
    // this.housesDoc = this.afs.doc(`Reserv`);
    this.reservationsCollection.add(reserve);
  }

  getReservations(uid: String) {
    this.reservationsCollection = this.afs.collection('Reserv', ref => {
      return ref.where('guestUID', '==', uid);
    });

    console.log('isitwork?');
    return this.reservationsCollection.valueChanges();
  }

}


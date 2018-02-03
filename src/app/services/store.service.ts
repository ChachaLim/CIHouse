import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { House } from '../data';



@Injectable()
export class StoreService {

  private housesCollection: AngularFirestoreCollection<House>;
  private positionsCollection: AngularFirestoreCollection<any>;
  house: Observable<House[]>;
  position: Observable<any[]>;
  constructor(private afs: AngularFirestore) {
    this.housesCollection = this.afs.collection<House>('House');
    this.positionsCollection = this.afs.collection<any>('Positions');

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
    // let targetHouse;
    // console.log('service params: '+ id);
    // this.getHouses().subscribe(res=>{
    //   res.forEach(house => {
    //     if(house.id === id){ targetHouse = house;}
    //   });
    // })
    // console.log(targetHouse);
    // return targetHouse;
    return this.housesCollection.doc(`${id}`).valueChanges();
  }

}


import { Observable } from 'rxjs/Observable';
import { House } from './../models/House';
import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Router } from '@angular/router';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

declare var daum: any;



@Component({
  selector: 'app-inputdata',
  templateUrl: './inputdata.component.html',
  styleUrls: ['./inputdata.component.css']
})
export class InputdataComponent implements OnInit {
  isChecked = false;
  isPhoto = false;

  house: House = {
    hostName: '',
    houseName: '',
    address: '',
    price: '',
    path: '',
    coords: {
      lat: '',
      lng: ''
    }
  };

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;

  private container;
  private options;
  private map;
  private address;
  private InputAddressCoords;
  private marker = new daum.maps.Marker();
  private infowindow = new daum.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
  private geocoder = new daum.maps.services.Geocoder();

  constructor(
    private storeService: StoreService,
    private route: Router,
    private el: ElementRef,
    public renderer: Renderer,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) {
    this.authService.getCurrentUser().subscribe( user => {
      if (user) {
        this.house.hostName = user.displayName;
      } else {

      }
    });
  }

  ngOnInit() {
     // 맵로드
     this.container = document.getElementById('map');
     this.options = {
       center: new daum.maps.LatLng(33.450701, 126.570667),
       level: 3
     };
     this.map = new daum.maps.Map(this.container, this.options);
  }

  searchAddress() {
    this.geocoder.addressSearch(this.house.address, (result, status) => {
      // 정상적으로 검색이 완료됐으면
      if (status === daum.maps.services.Status.OK) {

        const coords = new daum.maps.LatLng(result[0].y, result[0].x);
        this.house.coords.lat = coords.jb;
        this.house.coords.lng = coords.ib;
        console.log(coords);
        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new daum.maps.Marker({
          map: this.map,
          position: coords
        });

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        this.map.setCenter(coords);

        // 주소 체크 후 등록하기 버튼 생성
        this.isChecked = true;
      }
    });
  }

  addHouse() {
    this.storeService.addHouse(this.house);    
  }

  showPhoto() {
    this.isPhoto = true;
  }

  hidePhoto() {
    this.isPhoto = false;
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  startUpload(event: FileList) {
    const file = event.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    const path = `photo/${new Date().getTime()}_${file.name}`;

    this.task = this.storage.upload(path, file);

    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap( snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          this.task.downloadURL().subscribe( u => {
            this.house.path = u;
          });
        }
      })
    );
    console.log(this.snapshot);

    this.downloadURL = this.task.downloadURL();
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}

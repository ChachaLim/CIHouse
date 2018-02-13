import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { House } from './../models/House';
import { StoreService } from './../services/store.service';

declare var daum: any;

@Component({
  selector: 'app-mod-house',
  templateUrl: './mod-house.component.html',
  styleUrls: ['./mod-house.component.css']
})
export class ModHouseComponent implements OnInit {
  house: House;
  isChecked = false;
  isPhoto = false;

  // map
  private container;
  private options;
  private map;
  private address;
  private InputAddressCoords;
  private marker = new daum.maps.Marker();
  private infowindow = new daum.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
  private geocoder = new daum.maps.services.Geocoder();

  // photo
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private storage: AngularFireStorage,
  ) {
    this.getHouse();
  }

  ngOnInit() {}

  getHouse() {
    const id = this.route.snapshot.params.id;


    this.storeService.getHouse(id).subscribe(res => {
      this.house = res;

      // TODO: 맵이 로드되지 않는 오류 수정해야함
      this.container = document.getElementById('map');
      this.options = {
        center: new daum.maps.LatLng(res['coords'].lat, res['coords'].lng),
        level: 3
      };
      this.map = new daum.maps.Map(this.container, this.options);
    });
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
        // this.map.setCenter(coords);

        // 주소 체크 후 등록하기 버튼 생성
        this.isChecked = true;
      }
    });
  }

  update() {
    this.storeService.updateHouse(this.route.snapshot.params.id, this.house);
    this.router.navigateByUrl('/main');
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

    // 업로드가 진행중일 때 등록하기를 방지하기 위해서 등록하기버튼 비활성화
    this.isChecked = false;

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

          // 업로드가 다되면 등록하기 버튼 활성화
          this.isChecked = true;
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

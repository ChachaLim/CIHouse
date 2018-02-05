import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

declare var daum: any;




@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  // Daum map ApI 변수들
  private map;
  private container;
  private options;
  private marker;
  private clusterer;
  private markerPosition: Subscription;
  private test;
  private clustererMarker;

  constructor(private storeService: StoreService, private route: Router, private elementRef: ElementRef, private renderer: Renderer) {

  }

  ngOnInit() {

    // 맵을 도큐먼트에 로딩합니다.
    this.container = document.getElementById('map');
    this.options = {
      center: new daum.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    this.map = new daum.maps.Map(this.container, this.options);

    // 클러스터러 생성
    this.clusterer = new daum.maps.MarkerClusterer({
      map: this.map, // 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 10 // 클러스터 할 최소 지도 레벨
    });


    this.clustererMarker = this.storeService.getHouses().subscribe( res => {

      const markers = res.map((data, i) => {
        console.log(i);
        if (data.coords) {
          const marker = new daum.maps.Marker({
            title : data.id,
            position : new daum.maps.LatLng(data.coords.lat, data.coords.lng)
          });
          console.log(data.coords.lat + ' / ' + data.coords.lng);
          daum.maps.event.addListener(marker, 'click', r => {
            this.route.navigateByUrl('/detail/' + data.id);
          });
          return marker;
        } else {
          console.log('no coords');
          return;
        }
      });

      this.clusterer.addMarkers(markers);

    });

  } // ngOnInit close

}

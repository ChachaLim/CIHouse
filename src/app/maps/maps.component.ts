import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


declare var daum: any;
declare var navigator: any;


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit{
  // Daum map ApI 변수들
  private map;
  private container;
  private options;
  private marker;
  private clusterer;
  private markerPosition: Subscription;
  private test;
  private clustererMarker;
  private myLocation;
  private markers;
  constructor(private storeService: StoreService, private route: Router, private elementRef: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {
    console.log('maps component onInit!');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => {
        this.myLocation = res.coords;
        this.container = document.getElementById('map');
        this.options = {
          center: new daum.maps.LatLng(this.myLocation.latitude, this.myLocation.longitude),
          level: 3
        };
        this.map = new daum.maps.Map(this.container, this.options);
        console.log('if 통과');
        this.setClusterer();
        
      }, (err) => {
        console.error(err);
      }, {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: Infinity
        })
    } else {
      alert('GPS를 지원하지 않습니다.');
      this.setClusterer();
    }

  } // ngOnInit close

  setClusterer(){
    this.markers = null;
    this.clusterer = null;
    // 클러스터러 생성
    this.clusterer = new daum.maps.MarkerClusterer({
      map: this.map, // 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 10 // 클러스터 할 최소 지도 레벨
    });


    this.clustererMarker = this.storeService.getHouses().subscribe(res => {
      this.markers = res.map((data, i) => {

        if (data.coords) {
          const marker = new daum.maps.Marker({
            title: data.id,
            position: new daum.maps.LatLng(data.coords.lat, data.coords.lng)
          });

          daum.maps.event.addListener(marker, 'click', r => {
            this.route.navigateByUrl('/detail/' + data.id);
          });
          return marker;
        } else {
          return;
        }
      });

      this.clusterer.addMarkers(this.markers);

    });
  }
}

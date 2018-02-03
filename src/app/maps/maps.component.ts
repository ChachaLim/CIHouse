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
    // let test = this.renderer.listen(this.marker, 'click', (event)=>{
    //   console.log('test');
    // })
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

      /*
      let markers = res.map((i, position)=>{
        console.log(i);
        let marker = new daum.maps.Marker({
          title :  i.$id;
          position : new daum.maps.LatLng(i.coords.lat, i.coords.lng)
        });
        daum.maps.event.addListener(marker, 'click', function(res){
          console.log(res);
        });
        return marker;
      });

      this.clusterer.addMarkers(markers);
      */
      const markers = res.map((data, i) => {
        const house = data;
        const id = data.id;
        const marker = new daum.maps.Marker({
          title : id,
          position : new daum.maps.LatLng(house.coords.lat, house.coords.lng)
        });
        daum.maps.event.addListener(marker, 'click', res => {
          this.route.navigateByUrl('/detail/' + id);
        });
        return marker;
      });

      this.clusterer.addMarkers(markers);
    });


    /*this.house = this.housesCollection.snapshotChanges().map( changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as House;
        data.id = a.payload.doc.id;
        return data;
      });
    });*/




    // 서비스에서 정보를 가져온 후에 마커를 입력하는 방식

    /*this.markerPosition = this.storeService.getHouses().subscribe((res) => {
      for (var i = 0; i < res.length; i++) {
        this.marker = new daum.maps.Marker({
          map: this.map,
          title: res[i].houseName,
          position: new daum.maps.LatLng(res[i].coords.lat, res[i].coords.lng),
          clickable: true
        });
        // let test = this.renderer.listen(this.marker, 'click', (event) => {
        //   console.log('test');
        // })
        daum.maps.event.addListener(this.marker, 'click', ()=>{
          //console.log(event.target);
          this.route.navigateByUrl('/detail/'+event.target.title);
        });


      }
    });*/

  }

}

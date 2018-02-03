import { StoreService } from './../services/store.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { House } from '../data';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  
  house:House;
  constructor( 
    private route: ActivatedRoute,
    private storeService: StoreService,
    private location: Location) {
      this.getHouse();
    }

  ngOnInit() {
    
  }

  getHouse(){
    const id = this.route.snapshot.params.id;
    this.storeService.getHouse(id).subscribe(res=>{console.log(res); this.house = res;});    
  }

}

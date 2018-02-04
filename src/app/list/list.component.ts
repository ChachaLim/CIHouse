import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private houses;
  constructor(private storeService: StoreService) {
    this.houses = this.storeService.getHouses();
  }

  ngOnInit() {

  }

}

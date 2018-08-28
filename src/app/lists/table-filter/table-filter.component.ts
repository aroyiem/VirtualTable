import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.css']
})
export class TableFilterComponent implements OnInit {

  filterText:string;

  @Input()
  items: any[];
  itemsInPage:number;
  height :number;
  responseData:any[];

  constructor() { }

  ngOnInit() {
  }

}

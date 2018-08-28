import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ListItem } from './list-item.component';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { ChangeEvent } from '../virtual-scroll/virtual-scroll.component';


@Component({
  selector: 'list-with-api',
  template: `
    <div class="status">
      Showing <span class="badge">{{indices?.start}}</span>
      - <span class="badge">{{indices?.end}}</span>
      of <span class="badge">{{buffer?.length}}</span>
      <span>({{scrollItems?.length}} nodes)</span>
    </div>
    <div>
    <button (click)="show = !show">{{show ? 'hide' : 'show'}}</button>
    show = {{show}}
    <input [(ngModel)]="searchText" placeholder="search text goes here" (ngModelChange)="onChangeFilter()">
    
    <div>

    <virtual-scroll
      *ngIf="show"
      [items]="buffer"
      (update)="scrollItems =   $event"
      (end)="fetchMore($event)">

      
      <table>
		  <tbody #container>
			<tr *ngFor="let item of scrollItems">
			  <td>{{item.index + 1}}</td>
			  <td>{{item.name}}</td>
			  <td>{{item.gender}}</td>
			  <td>{{item.age}}</td>
			  <td>{{item.address}}</td>
			</tr>
		  </tbody>
      </table>
      <div *ngIf="loading" class="loader">Loading...</div>

    </virtual-scroll>
  `,
  styleUrls: ['./list-with-api.scss']
})
export class ListWithApiComponent implements OnChanges {

  searchText:string;
  @Input()
  items: any[];
  scrollItems: any[];

  indices: ChangeEvent;
  buffer: any[] = [];
  readonly bufferSize: number = 10;
  timer;
  loading: boolean;
  show:boolean = false;

  
  ngOnChanges(changes: SimpleChanges) {
    this.reset();
  }

  reset() {
    this.fetchNextChunk(0, this.bufferSize, {}).then(chunk => this.buffer = chunk);
  }

  fetchMore(event: ChangeEvent) {
    this.indices = event;
    if (event.end === this.buffer.length - 1) {
      this.loading = true;
      this.fetchNextChunk(this.buffer.length, this.bufferSize, event).then(chunk => {
        this.buffer = this.buffer.concat(chunk);
        this.loading = false;
      }, () => this.loading = false);
    }
  }

  fetchNextChunk(skip: number, limit: number, event?: any): Promise<ListItem[]> {
    return new Promise((resolve, reject) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (skip < this.items.length) {
          return resolve(this.items.slice(skip, skip + limit));
        }
        reject();
      }, 1000 + Math.random() * 1000);
    });
  }

  onChangeFilter(){
    this.buffer = this.items.filter((singleItem) =>{

      if(this.searchText === ''){
        return this.items;
      }
      return singleItem['address'].toLowerCase().
      includes(this.searchText.toLowerCase());
    }); 
    console.log(this.items);
  }
}

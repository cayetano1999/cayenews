import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Segment } from 'src/app/core/interfaces/segment';
import { Articles } from '../../core/interfaces/news-response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string  = '';
  @Input() showBackButton: boolean = true;
  @Input() segments: Array<Segment>;
  @Input() showSegment: boolean
  @Output() selectedSegment = new EventEmitter();
  defaultSegment: string = 'business'
  constructor() { }

  ngOnInit() {}

  segmentChanged(event){

  }

  doRefresh(event){

  }

  sendValue(item: Segment){
    console.log(item);
    this.title = item.display
    this.selectedSegment.emit(item);
  }

}

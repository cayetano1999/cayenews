import { Component, Input, OnInit } from '@angular/core';
import { Segment } from 'src/app/core/interfaces/segment';
import { Articles } from '../../core/interfaces/news-response';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit {
  @Input() news: Articles[];
  @Input() index: number;
  filter: string = '';
 
  constructor() { }

  ngOnInit() { }

  onSearchChange(event){
    this.filter = event.detail.value;

  }
}

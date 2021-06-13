import { Component, Input, OnInit } from '@angular/core';
import { Articles } from '../../core/interfaces/news-response';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit {
  @Input() news: Articles;
  @Input() index: number;
  constructor() { }

  ngOnInit() { }

}

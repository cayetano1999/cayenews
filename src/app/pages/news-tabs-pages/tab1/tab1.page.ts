import { Component, OnInit } from '@angular/core';
import { NewsResponse } from 'src/app/core/interfaces/news-response';
import { NewsApiService } from '../../../core/services/news-api/news-api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private newsApiService: NewsApiService) {

  }
  news: NewsResponse;
  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews(){
    this.newsApiService.getByCountry('us').subscribe(response=> {
      if(response.status == 'ok'){
        this.news = response;
        console.log(this.news);
      }
    });
  }

}

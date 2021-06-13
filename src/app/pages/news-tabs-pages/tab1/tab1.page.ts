import { Component, OnInit } from '@angular/core';
import { NewsResponse } from 'src/app/core/interfaces/news-response';
import { NewsApiService } from '../../../core/services/news-api/news-api.service';
import { Articles } from '../../../core/interfaces/news-response';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  filter: string = '';

  constructor(private newsApiService: NewsApiService) {

  }
  news: Articles[];
  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews(){
    this.newsApiService.getByCountry('us').subscribe(response=> {
      if(response.status == 'ok'){
        this.news = response.articles;
        console.log(this.news);
      }
    });
  }

  doRefresh(event){

  }

  onSearchChange(event){
    this.filter = event.detail.value;

  }

}

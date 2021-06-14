import { Component, OnInit } from '@angular/core';
import { Articles } from '../../../core/interfaces/news-response';
import { DataLocalService } from '../../../core/services/data-local/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  news: Articles[];
  constructor(private dataLocalService: DataLocalService) {}

  ngOnInit(): void {
    this.dataLocalService.create();
    this.getFavoritos();
  }

  getFavoritos(){
    this.dataLocalService.getNews().then(r=> {
      this.news = r;
    })
    if(this.news) {
      this.dataLocalService.news = this.news;
    }
    else{
      this.dataLocalService.news = [];
    }
  }

  doRefresh(ev) {
    this.dataLocalService.getNews().then(r=>{
      this.news = r;
      ev?.target?.complete();
    })
  }


}

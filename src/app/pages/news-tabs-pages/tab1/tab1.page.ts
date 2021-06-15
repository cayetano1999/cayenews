import { Component, OnInit } from '@angular/core';
import { NewsResponse } from 'src/app/core/interfaces/news-response';
import { NewsApiService } from '../../../core/services/news-api/news-api.service';
import { Articles } from '../../../core/interfaces/news-response';
import { ToastController } from '@ionic/angular';
import { ToastControllerService } from 'src/app/core/services/ionic-components/toast-controller.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  filter: string = '';
  page: number = 1;
  generalError: boolean = false;

  constructor(private newsApiService: NewsApiService, private toastService: ToastControllerService) {

  }
  news: Articles[];
  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews(ev?) {
    this.newsApiService.getByCountry('news-for-you.json').subscribe(response => {
      ev?.target?.complete();
      if (response.status == 'ok') {
        this.news = response.articles;
        console.log(this.news);
        this.generalError = false;
      }

    }, (error) => {
      console.log(error);
      this.generalError = true;
      this.toastService.showToastError(`Ha ocurrido un error: ${error?.message}`);

    });
  }

  doRefresh(ev) {
    this.getAllNews(ev);
  }

  refreshAllNews() {

  }

  onSearchChange(event) {
    this.filter = event.detail.value;

  }

  getAllToScroll(event) {
    this.page++;
    this.newsApiService.getByCountry('news-for-you.json').subscribe(r => {
  
      if (r.status == 'ok') {
        if (r.articles.length == 0) {
          event.target.disabled = true;
          this.toastService.showToastSuccess('All news has been displayed');
        }
        else {
          this.news.push(...r.articles);
          event.target.complete();
        }
        this.generalError = false;

      }

    }, (error) => {
      this.toastService.showToastError('Ha ocurrido un error');
      this.generalError = true;
      event.target.disabled = true;

    });
  }


}

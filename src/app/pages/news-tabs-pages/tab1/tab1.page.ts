import { Component, OnInit } from '@angular/core';
import { NewsResponse } from 'src/app/core/interfaces/news-response';
import { NewsApiService } from '../../../core/services/news-api/news-api.service';
import { Articles } from '../../../core/interfaces/news-response';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  filter: string = '';
  page: number = 1;

  constructor(private newsApiService: NewsApiService, private toastController: ToastController) {

  }
  news: Articles[];
  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews(ev?) {
    this.newsApiService.getByCountry('us', 1).subscribe(response => {
      if (response.status == 'ok') {
        this.news = response.articles;
        console.log(this.news);
        ev?.target?.complete();
      }
    });
  }

  doRefresh(ev) {
    this.getAllNews(ev);
  }

  refreshAllNews(){

  }

  onSearchChange(event) {
    this.filter = event.detail.value;

  }

  getAllToScroll(event) {
    this.page++;
      this.newsApiService.getByCountry('us', this.page).subscribe(r => {
        debugger;
        if (r.articles.length == 0) {
          event.target.disabled = true;
          this.presentToast('All news has been displayed')
        }
        else {
          this.news.push(...r.articles);
          event.target.complete();
        }
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}

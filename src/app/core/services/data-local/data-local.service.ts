import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { Articles } from '../../interfaces/news-response';
import { ToastControllerService } from '../ionic-components/toast-controller.service';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {


  news: Articles[] = [];
  constructor(private storage: Storage, private toast: ToastControllerService) {

  }

  async saveNews(article: Articles) {
    const exist = this.news.filter(n => n == article).length > 0;
    if (!exist) {
      this.news.unshift(article);
      await this.storage.set('favoritos', this.news);
      this.toast.showToastSuccess('this news has been added to favorites');
    }
    else {
      this.toast.showToastWarning('this news already exist in your favorites');
    }
  }

  async restartNews(articles: Articles[]) {
    await this.storage.set('favoritos', []);
    await this.storage.set('favoritos', articles);
  }

  async getNews() {
    return  await this.storage.get('favoritos');
  }

  async removeNew(item: Articles) {
    debugger;
    this.news = this.news.filter(n => n.title != item.title);
    await this.storage.set('favoritos', this.news);
  }

  create() {

    this.storage.create();
  }
}

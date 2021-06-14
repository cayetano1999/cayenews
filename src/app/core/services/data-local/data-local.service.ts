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

  saveNews(article: Articles) {
    const exist = this.news.filter(n => n == article).length > 0;
    if (!exist) {
      this.news.unshift(article);
      this.storage.set('favoritos', this.news).then(r=> {
        this.toast.showToastSuccess('this news has been added to favorites');
      });
    }
    else {
      this.toast.showToastWarning('this news already exist in your favorites');
    }
  }

  restartNews(articles: Articles[]) {
    this.storage.set('favoritos', []).then(r=> {
      this.storage.set('favoritos', articles);
    })
  }

  getNews() {
    return this.storage.get('favoritos');
  }

  removeNew(item: Articles) {
    debugger;
    this.news = this.news.filter(n => n.title != item.title);
    this.storage.set('favoritos', this.news);
  }

  create() {

    this.storage.create();
  }
}

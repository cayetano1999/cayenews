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

  async getItem(item: string) {
    return  await this.storage.get(item);
  }

  async removeNew(item: Articles) {

    this.news = this.news.filter(n => n.title != item.title);
    await this.storage.set('favoritos', this.news);
  }

  async create() {
    return await this.storage.create();
  }

  async addItem(key: string, value:any){
    await this.storage.set(key, value);
  }

  async clear() {
    return await this.storage.clear();
  }
}

import { Component, OnInit } from '@angular/core';
import { Articles } from '../../../core/interfaces/news-response';
import { DataLocalService } from '../../../core/services/data-local/data-local.service';
import { AlertControllerService } from '../../../core/services/ionic-components/alert-controller.service';
import { ToastControllerService } from 'src/app/core/services/ionic-components/toast-controller.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  news: Articles[];
  constructor(private dataLocalService: DataLocalService, private toastService: ToastControllerService, private alertService: AlertControllerService) { }

  async ngOnInit() {
    this.dataLocalService.create();
    await this.getFavoritos();
  }

  async getFavoritos() {
    this.news = await this.dataLocalService.getNews();
    this.verifyNews();
  }

  doRefresh(ev) {
    this.dataLocalService.getNews().then(r => {
      this.news = r;
      this.verifyNews();
      ev?.target?.complete();
    })
  }

  verifyNews() {
    if (!this.news) {
      this.news = [];
    }
  }

  deleteNews(item: Articles) {
    console.log(item);
    this.alertService.confirmation((r) => {
      debugger

      this.news = this.news.filter(n => n.title != item.title);
      this.dataLocalService.news = this.news;
      this.toastService.showToastSuccess('News has been deleted  successfully');
      this.dataLocalService.restartNews(this.news);
      // this.getFavoritos();

    }, '¿Are you sure?', 'This item will be deleted', 'Yes, I am sure');
  }

  async clearFavorites(event) {
    console.log('Se limpió la db');
    await this.getFavoritos();
  }


}

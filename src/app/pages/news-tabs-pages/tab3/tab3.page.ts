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

  ngOnInit(): void {
    this.dataLocalService.create();
    this.getFavoritos();
  }

  getFavoritos() {
    this.dataLocalService.getNews().then(r => {
      debugger;
      this.news = r;
    })

  }

  doRefresh(ev) {
    this.dataLocalService.getNews().then(r => {
      this.news = r;
      ev?.target?.complete();
    })
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


}

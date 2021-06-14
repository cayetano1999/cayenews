import { Component, Input, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Segment } from 'src/app/core/interfaces/segment';
import { Articles } from '../../core/interfaces/news-response';
import { ToastControllerService } from 'src/app/core/services/ionic-components/toast-controller.service';
import {Storage} from '@ionic/storage'
import { DataLocalService } from 'src/app/core/services/data-local/data-local.service';
import { AlertControllerService } from 'src/app/core/services/ionic-components/alert-controller.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit {
  @Input() news: Articles[];
  @Input() index: number;
  filter: string = '';
  new: Articles
  @Input() favorites: boolean = true;
 
  constructor(private iab: InAppBrowser, private socialShared: SocialSharing, private toastService: ToastControllerService, private dataLocalService: DataLocalService, private alertService: AlertControllerService) { }

  ngOnInit() { 
    this.dataLocalService.create();
  }

  onSearchChange(event){
    this.filter = event.detail.value;

  }

  redirectToNew(item: Articles){
    this.iab.create(item.url, '_system');
  }

  shared(item: Articles){
    this.socialShared.share(item.title, item.source.name, '', item.url).then(() => {
      this.toastService.showToastSuccess('News has been shared successfully');
    }).catch(() => {
      this.toastService.showToastError('Error while sharing news');
    });
  }

  addToFavorite(item: Articles){
    this.dataLocalService.saveNews(item);
  }

  removeFavorite(item: Articles){
    this.alertService.confirmation((r)=> {
      this.dataLocalService.removeNew(item);
    },'¿Are you sure?', 'This item will be deleted', 'Yes, I am sure');
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Segment } from 'src/app/core/interfaces/segment';
import { Articles } from '../../core/interfaces/news-response';
import { ToastControllerService } from 'src/app/core/services/ionic-components/toast-controller.service';
import { Storage } from '@ionic/storage'
import { DataLocalService } from 'src/app/core/services/data-local/data-local.service';
import { AlertControllerService } from 'src/app/core/services/ionic-components/alert-controller.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit {
  @Input() news: Articles[];
  @Input() index: number;
  @Output() newsToDelete = new EventEmitter();
  filter: string = '';
  new: Articles
  favoritesNews: Articles[];
  @Input() favorites: boolean = true;
  @Output() addFavorite = new EventEmitter();
  @Output() clearFavoritesEvent = new EventEmitter();


  constructor(private actionSheet: ActionSheetController, private iab: InAppBrowser, private socialShared: SocialSharing, private toastService: ToastControllerService, private dataLocalService: DataLocalService, private alertService: AlertControllerService) { }

  async ngOnInit() {
    this.dataLocalService.create();
    this.favoritesNews = await this.dataLocalService.getNews();
    console.log('FAVORITOS', this.favoritesNews);
  }

  onSearchChange(event) {
    this.filter = event.detail.value;

  }

  redirectToNew(item: Articles) {
    this.iab.create(item.url, '_system');
  }

  shared(item: Articles) {
    this.socialShared.share(item.title, item.source.name, '', item.url).then(() => {
      this.toastService.showToastSuccess('News has been shared successfully');
    }).catch(() => {
      this.toastService.showToastError('Error while sharing news');
    });
  }

  async addToFavorite(item: Articles) {
    debugger;
    await this.dataLocalService.saveNews(item);
    this.favoritesNews = await this.dataLocalService.getNews();
  }

  removeFavorite(item: Articles) {
    this.newsToDelete.emit(item);

  }

  isFavorite(item: Articles) {
    debugger;
    let value = false
    if (this.favoritesNews) {
      let exist = this.favoritesNews.filter(e => e.title == item.title).length > 0;
      if (exist) {
        value = true;
      }

    }
    return value;
  }

  async showOptions(t) {
    const actionSheet = await this.actionSheet.create({
      header: 'Options',
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      translucent: true,
      animated: true,

      buttons: [{
        text: 'Remove all news',
        role: 'destructive',
        icon: 'trash',
        cssClass: 'rojo',
        handler: () => {
          this.clearFavorites();
        }
      },
      ]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async clearFavorites(){
    await this.dataLocalService.clear();
    this.news = [];
    this.toastService.showToastSuccess('Done!!');
    this.clearFavoritesEvent.emit({deleted: true});
  }

}



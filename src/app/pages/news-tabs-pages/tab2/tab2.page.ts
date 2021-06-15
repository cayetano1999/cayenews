import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { IonSegment, ToastController } from '@ionic/angular';
import { Articles } from 'src/app/core/interfaces/news-response';
import { Segment } from 'src/app/core/interfaces/segment';
import { NewsApiService } from '../../../core/services/news-api/news-api.service';
import { ToastControllerService } from '../../../core/services/ionic-components/toast-controller.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss']
})
export class Tab2Page implements OnInit {
  page: number = 1;

  constructor(private newsApiService: NewsApiService, private toastControllerService: ToastControllerService) {

  }


  filter: string = '';
  defaultSegment: string = 'business';
  segments: Array<Segment> = [
    {
      display: 'Empresas',
      name: 'business',
      icon: 'business-outline'
    },
    {
      display: 'Entretenimiento',
      name: 'entertainment',
      icon: 'tv-outline'
    },
    {
      display: 'General',
      name: 'general',
      icon: 'apps-outline'
    },
    {
      display: 'Salud',
      name: 'health',
      icon: 'medkit'
    },
    {
      display: 'Ciencias',
      name: 'science',
      icon: 'color-wand-outline'
    },
    {
      display: 'Deportes',
      name: 'sports',
      icon: 'baseball-outline'
    },
    {
      display: 'Tecnologia',
      name: 'technology',
      icon: 'laptop-outline'
    }
  ];
  news: Array<Articles>;
  generalError: boolean = false;

  ngOnInit(): void {
    this.getByCountryAndCategory(this.defaultSegment)
  }

  segmentChanged(event) {

  }

  doRefresh(event) {
    this.getByCountryAndCategory(event);
  }

  getByCountryAndCategory(ev?) {
    this.newsApiService.getByCountryAndCategory(this.defaultSegment).subscribe(response => {
      ev?.target?.complete();
      this.news = response.articles;
      ev?.target?.complete();
      this.generalError = false;
    }, (error) => {
      ev?.target?.complete();
      this.toastControllerService.showToastError('Ha ocurrido un error');
      this.generalError = true;
    })
  }

  onSearchChange(event) {
    this.filter = event.detail.value;

  }

  getSegment(item: Segment) {
    console.log(item);
    this.defaultSegment = item.name;
    this.getByCountryAndCategory();
  }

  getAllToScroll(event) {
    this.page++;
    this.newsApiService.getByCountryAndCategory(this.defaultSegment).subscribe(r => {
      this.generalError = false;
      if (r.articles.length == 0) {
        event.target.disabled = true;
        this.toastControllerService.showToastSuccess('All news has been displayed')
      }
      else {
        this.news.push(...r.articles);
        event.target.complete();
      }
    }, (error) => {
      this.toastControllerService.showToastError('Ha ocurrido un error');
      this.generalError = true;
    });
  }


}

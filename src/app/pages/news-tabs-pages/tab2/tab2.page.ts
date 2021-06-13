import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Articles } from 'src/app/core/interfaces/news-response';
import { Segment } from 'src/app/core/interfaces/segment';
import { NewsApiService } from '../../../core/services/news-api/news-api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
  constructor(private newsApiService: NewsApiService) {
    
  }
  
  
  filter: string = '';
  defaultSegment: string = 'business';
  segments: Array<Segment> = [
    {
      display:'Empresas',
      name:'business',
      icon: 'business-outline'
    },
    {
      display:'Entretenimiento',
      name:'entertainment',
      icon: 'tv-outline'
    },
    {
      display:'General',
      name:'general',
      icon:'apps-outline'
    },
    {
      display:'Salud',
      name:'health',
      icon:'medkit'
    },
    {
      display:'Ciencias',
      name:'science',
      icon:'color-wand-outline'
    },
    {
      display:'Deportes',
      name:'sports',
      icon: 'baseball-outline'
    },
    {
      display:'Tecnologia',
      name:'technology',
      icon:'laptop-outline'
    }
  ];
  news: Array<Articles>;

  ngOnInit(): void {
    this.getByCountryAndCategory(this.defaultSegment)
  }

  segmentChanged(event){

  }

  doRefresh(event){

  }

  getByCountryAndCategory(category: string){
    this.newsApiService.getByCountryAndCategory('us', category).subscribe(response=> {
      this.news = response.articles;
    })
  }

  onSearchChange(event){
    this.filter = event.detail.value;

  }

  getSegment(item: Segment){
    console.log(item);
    this.getByCountryAndCategory(item.name);
  }

}

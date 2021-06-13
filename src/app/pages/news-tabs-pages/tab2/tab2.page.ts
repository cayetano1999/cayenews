import { Component } from '@angular/core';
import { Segment } from 'src/app/core/interfaces/segment';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss']
})
export class Tab2Page {

  constructor() {}
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
  ]
  
  segmentChanged(event){

  }

}

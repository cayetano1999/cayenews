import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import { NewsCardComponent } from './news-card/news-card.component';
import { PipesModule } from '../core/pipes/pipes.module';

@NgModule({
    declarations: [HeaderComponent, NewsCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports:[HeaderComponent, NewsCardComponent]

  })
  export class ComponentsModule {}
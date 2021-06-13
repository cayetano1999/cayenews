import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import { NewsCardComponent } from './news-card/news-card.component';

@NgModule({
    declarations: [HeaderComponent, NewsCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[HeaderComponent, NewsCardComponent]

  })
  export class ComponentsModule {}
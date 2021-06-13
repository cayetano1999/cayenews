import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}

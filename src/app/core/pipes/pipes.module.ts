import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { FilterPipePipe } from './filter-pipe.pipe';

@NgModule({
    declarations: [FilterPipePipe],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [FilterPipePipe]

})
export class PipesModule { }
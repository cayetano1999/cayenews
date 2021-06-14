import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { StatusBar } from '@ionic-native/status-bar/index';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private splashScreen: SplashScreen, private stb: StatusBar ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.stb.show();
      this.stb.styleLightContent();
      this.splashScreen.hide();
    });
  }
}

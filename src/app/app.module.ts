import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgxGalleryModule } from 'ngx-gallery';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appStates } from './app.states';
import { SharedModule } from '../shared/shared.module';
import { ProfileModule } from '../components/profile/profile.module';
import { BiographyModule } from '../components/biography/biography.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ProfileModule,
    BiographyModule,
    NgxGalleryModule,
    HttpClientModule,
    RouterModule.forRoot(appStates),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { FlashcardsModule } from './flashcards/flashcards.module';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { BackEndService } from './backend-service';
import { httpInterceptorProviders } from './http-interceptors/index';
import { AppComponent } from './app.component';
import { TestsModule } from './tests/tests.module';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';



@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    MainNavigationComponent,
    FooterComponent,
    HomePageComponent
  ],
  imports: [
    AppRoutingModule,
    FlashcardsModule,
    TestsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    UserModule
  ],
  providers: [AuthGuard, BackEndService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ButtonModule } from 'primeng/button';

import { FlashcardsModule } from './flashcards/flashcards.module';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { httpInterceptorProviders } from './http-interceptors/index';
import { AppComponent } from './app.component';
import { TestsModule } from './tests/tests.module';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { AuthenticationService } from './authentication.service';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';


@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    MainNavigationComponent,
    FooterComponent,
    HomePageComponent,
    WorkInProgressComponent
  ],
  imports: [
    AppRoutingModule,
    FlashcardsModule,
    TestsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    UserModule,
    ButtonModule
  ],
  providers: [AuthGuard, httpInterceptorProviders, AuthenticationService, {
    provide: LocationStrategy, useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

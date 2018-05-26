import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { FlashcardsModule } from './flashcards/flashcards.module';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { httpInterceptorProviders } from './http-interceptors/index';
import { AppComponent } from './app.component';
import { TestsModule } from './tests/tests.module';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { AuthenticationService } from './authentication.service';
import { MaterialsModule } from './materials/materials.module';
import { FilterPipe } from './filter.pipe';



@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    MainNavigationComponent,
    FooterComponent,
    HomePageComponent,
    FilterPipe
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
    MaterialsModule
  ],
  providers: [ AuthGuard, httpInterceptorProviders, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

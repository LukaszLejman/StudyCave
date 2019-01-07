import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialsModule } from './materials/materials.module';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { TestsModule } from './tests/tests.module';
import { GroupsModule } from './groups/groups.module';
import { UserModule } from './user/user.module';

import { httpInterceptorProviders } from './http-interceptors/index';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';

import { AuthGuard } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';
import { SharedModule } from './shared/shared.module';
import { RoutingStateService } from './routing-state.service';


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
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FlashcardsModule,
    MaterialsModule,
    TestsModule,
    GroupsModule,
    UserModule,
    SharedModule
  ],
  providers: [AuthGuard, httpInterceptorProviders, AuthenticationService, RoutingStateService, {
    provide: LocationStrategy, useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

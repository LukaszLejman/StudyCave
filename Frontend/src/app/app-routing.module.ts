import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlashcardsComponent } from './flashcards/flashcards/flashcards.component';
import { FlashcardsSetsListComponent } from './flashcards/flashcards-sets-list/flashcards-sets-list.component';
import { FlashcardsAddComponent } from './flashcards/flashcards-add/flashcards-add.component';
import { FlashcardsAddCsvComponent } from './flashcards/flashcards-add-csv/flashcards-add-csv.component';
import { FlashcardsAddTableComponent } from './flashcards/flashcards-add-table/flashcards-add-table.component';
import { FlashcardsSetDetailComponent } from './flashcards/flashcards-set-detail/flashcards-set-detail.component';
import { FlashcardsPairsTestComponent } from './flashcards/flashcards-pairs-test/flashcards-pairs-test.component';
import { FlashcardsMemoryTestComponent } from './flashcards/flashcards-memory-test/flashcards-memory-test.component';
import { FlashcardsEditTableComponent } from './flashcards/flashcards-edit-table/flashcards-edit-table.component';
import { FlashcardsFillingInTestComponent } from './flashcards/flashcards-filling-in-test/flashcards-filling-in-test.component';
import { FlashcardsTyperaceTestComponent } from './flashcards/flashcards-typerace-test/flashcards-typerace-test.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { TestMakerComponent } from './tests/test-maker/test-maker.component';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { TestsModule } from './tests/tests.module';
import { UserModule } from './user/user.module';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user/user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'flashcards', component: FlashcardsComponent },
  { path: 'flashcards/sets', component: FlashcardsSetsListComponent },
  { path: 'flashcards/add', component: FlashcardsAddComponent },
  { path: 'flashcards/add/table', component: FlashcardsAddTableComponent },
  { path: 'flashcards/add/csv', component: FlashcardsAddCsvComponent },
  { path: 'flashcards/sets/:id', component: FlashcardsSetDetailComponent },
  { path: 'flashcards/test-gen/flashcards-pairs/:id', component: FlashcardsPairsTestComponent },
  { path: 'flashcards/test-gen/flashcards-memory/:id', component: FlashcardsMemoryTestComponent },
  { path: 'flashcards/test-gen/flashcards-typerace/:id', component: FlashcardsTyperaceTestComponent },
  { path: 'flashcards/test-gen/flashcards-filling-in/:id', component: FlashcardsFillingInTestComponent },
  { path: 'flashcards/sets/edit/:id', component: FlashcardsEditTableComponent },
  { path: 'test-maker', component: TestMakerComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'profile/:id', component: UserComponent },
  { path: 'edit-profile', component: EditUserComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FlashcardsModule,
    TestsModule,
    UserModule
  ],
  exports: [
    RouterModule,
    FlashcardsModule,
    TestsModule,
    UserModule
  ]
})
export class AppRoutingModule { }

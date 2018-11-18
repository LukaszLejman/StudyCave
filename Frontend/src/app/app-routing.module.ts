import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FlashcardsModule } from './flashcards/flashcards.module';
import { TestsModule } from './tests/tests.module';
import { UserModule } from './user/user.module';
import { GroupsModule } from './groups/groups.module';

import { AuthGuard } from './auth-guard.service';

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
import { TestMakerComponent } from './tests/test-maker/test-maker.component';
import { TestEditComponent } from './tests/test-edit/test-edit.component';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user/user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { MaterialsMenuComponent } from './materials/materials-menu/materials-menu.component';
import { MaterialsListComponent } from './materials/materials-list/materials-list.component';
import { MaterialsAddComponent } from './materials/materials-add/materials-add.component';
import { TestsListComponent } from './tests/tests-list/tests-list.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { TestDetailsComponent } from './tests/test-details/test-details.component';
import { MaterialsDetailsComponent } from './materials/materials-details/materials-details.component';
import { MyGroupsComponent } from './groups/my-groups/my-groups.component';
import { GroupCreatorComponent } from './groups/group-creator/group-creator.component';
import { GroupDetailsComponent } from './groups/group-details/group-details.component';
import { ManageGroupComponent } from './groups/manage-group/manage-group.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'flashcards', component: FlashcardsComponent },
  { path: 'flashcards/sets', component: FlashcardsSetsListComponent },
  { path: 'flashcards/add', component: FlashcardsAddComponent, canActivate: [AuthGuard] },
  { path: 'flashcards/add/table', component: FlashcardsAddTableComponent , canActivate: [AuthGuard]},
  { path: 'flashcards/add/csv', component: FlashcardsAddCsvComponent, canActivate: [AuthGuard] },
  { path: 'flashcards/sets/:id', component: FlashcardsSetDetailComponent },
  { path: 'flashcards/test-gen/flashcards-pairs/:id', component: FlashcardsPairsTestComponent },
  { path: 'flashcards/test-gen/flashcards-memory/:id', component: FlashcardsMemoryTestComponent },
  { path: 'flashcards/test-gen/flashcards-typerace/:id', component: FlashcardsTyperaceTestComponent },
  { path: 'flashcards/test-gen/flashcards-filling-in/:id', component: FlashcardsFillingInTestComponent },
  { path: 'flashcards/sets/edit/:id', component: FlashcardsEditTableComponent, canActivate: [AuthGuard] },
  { path: 'tests', component: TestsListComponent},
  { path: 'tests/:id', component: TestDetailsComponent},
  { path: 'tests/edit/:id', component: TestEditComponent, canActivate: [AuthGuard]},
  { path: 'test-maker', component: TestMakerComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'profile/:id', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'edit-profile', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'materials', component: MaterialsMenuComponent },
  { path: 'materials/list', component: MaterialsListComponent },
  { path: 'materials/add-materials', component: MaterialsAddComponent, canActivate: [AuthGuard] },
  { path: 'work-in-progress', component: WorkInProgressComponent },
  { path: 'materials/:id', component: MaterialsDetailsComponent},
  { path: 'my-groups', component: MyGroupsComponent, canActivate: [AuthGuard] },
  { path: 'create-group', component: GroupCreatorComponent, canActivate: [AuthGuard] },
  { path: 'groups/:id', component: GroupDetailsComponent, canActivate: [AuthGuard] },
  { path: 'groups/manage/:id', component: ManageGroupComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    FlashcardsModule,
    TestsModule,
    UserModule,
    GroupsModule
  ],
  exports: [
    RouterModule,
    FlashcardsModule,
    TestsModule,
    UserModule
  ]
})
export class AppRoutingModule { }

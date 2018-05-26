import { CommonModule } from '@angular/common';
import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MaterialsMenuComponent } from './materials-menu/materials-menu.component';
import { MaterialsListComponent } from './materials-list/materials-list.component';
import { RouterModule } from '@angular/router';
import { MaterialsService } from './materials.service';
import { MaterialsAddComponent } from './materials-add/materials-add.component';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  declarations: [MaterialsMenuComponent, MaterialsListComponent, MaterialsAddComponent],
  providers: [MaterialsService]
})
export class MaterialsModule { }

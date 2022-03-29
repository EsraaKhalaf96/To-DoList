import { SearchFilterPipe } from './../search-filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { TodolistComponent } from './todolist/todolist.component';
import { HeaderComponent } from '../shared/Layout/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    TodolistComponent,
    SearchFilterPipe

  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],

})
export class TodoModule { }

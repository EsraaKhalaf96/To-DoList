import { SearchFilterPipe } from './../search-filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { TodolistComponent } from './todolist/todolist.component';
import { HeaderComponent } from '../shared/Layout/header/header.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TodolistComponent,
    SearchFilterPipe

  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule
  ]
})
export class TodoModule { }

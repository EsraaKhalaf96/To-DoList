import { ToDoServiceService } from './../../shared/Services/to-do-service.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  @ViewChild('myModal', { static: true }) addModal: ElementRef;
  elm: HTMLElement;

todolist:any[] =[];
searchItem:string;

  constructor(private _todolistService: ToDoServiceService) { }

  ngOnInit(): void {
    //getAllToDoList items
    this.getAllToDoListItems();

  }
  ngAfterViewInit(): void {
    this.elm = this.addModal.nativeElement as HTMLElement;
 }
 close(): void {
  this.elm.classList.remove('show');
  setTimeout(() => {
    this.elm.style.width = '0';
  }, 75);
}
open(): void {
  this.elm.classList.add('show');
  this.elm.style.width = '100vw';
  document.body.style.overflow = 'hidden';
}
  // get all todolist items
  getAllToDoListItems (){
    this._todolistService.getAllToDos().subscribe((res)=>{
      // console.log(res)
      let filterdResult= res.slice(0,10);
           this.todolist=filterdResult;
     });
  }

  // delete item in todolist
  DeleteTask(id:any) {
    this.todolist=this.todolist.filter(task=> task.id!==id);
  }

  // search in todolist
  searchTask(){
    if(this.searchItem!=''){
      this.todolist = this.todolist.filter(res=>{
        return res.title.toLowerCase().includes(this.searchItem.toLowerCase())
      })
    }
    else{
      this.getAllToDoListItems()
    }


  }
}

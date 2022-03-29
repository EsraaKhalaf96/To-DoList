import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToDoServiceService } from './../../shared/Services/to-do-service.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  @ViewChild('myModal', { static: true }) addModal: ElementRef;
elm: HTMLElement;
title;
todolist:Array<any>;
searchItem:string;
completed: boolean = false;
addTaskForm:FormGroup;
submitted = false;
isAddModel:boolean=false;
  constructor(
    private _todolistService: ToDoServiceService,
    private fb: FormBuilder,
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private toastr: ToastrService
    ) {
      this.todolist = new Array<any>();
}
  ngOnInit() {
    //getAllToDoList items
    this.createAddTaskForm();
    this.getAllToDoListItems();

  }
  ngAfterViewInit(): void {
    this.elm = this.addModal.nativeElement as HTMLElement;
 }
 closeModal(): void {
  this.elm.classList.remove('show');
  setTimeout(() => {
    this.elm.style.width = '0';
  }, 75);
  document.body.style.overflow = 'visible';

}
open(): void {
  this.elm.classList.add('show');
  this.elm.style.width = '100vw';
  document.body.style.overflow = 'hidden';
}

createAddTaskForm(){
  this.addTaskForm = this.fb.group({
    addTask: ['',Validators.required],
  });
}
  // get all todolist items
  getAllToDoListItems (){
    this._todolistService.getAllToDos().subscribe((res)=>{
      console.log(res)
       this.todolist=res;
     });
  }

  // delete item in todolist
  DeleteTask(id:any) {
    if(confirm("Are you sure to delete this task")) {
      this.todolist=this.todolist.filter(task=> task.id!==id);
      this.toastr.success('Task Deleted Sucssesfuly');
    }
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

  //Add Task
  onSubmit(){
    this.submitted = true;
    if (this.addTaskForm.invalid) {
      return;
    }else{
      this.isAddModel=true;
      if(this.isAddModel){
        this.addTask()
      }
      else{
        // this.updateTask()
      }
    }


  }
  addTask(){
    this.todolist = [...this.todolist,{userId: 1, id: 2, title: this.addTaskForm.get('addTask')?.value , completed: false}];
    this.toastr.success('Task added Sucssesfuly');
    this.closeModal();
    this.addTaskForm.get('addTask')?.setValue('');
  }
  updateTask(id){
      this.open();
      this.addTaskForm.get('addTask')?.setValue('ddd');
  }
  addCompletedTask(){
    // console.log( this.todolist['completed'])

    // this.todolist['completed']= true;
  }
}

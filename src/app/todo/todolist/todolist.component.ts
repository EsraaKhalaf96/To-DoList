import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToDoServiceService } from './../../shared/Services/to-do-service.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { IToDo } from 'src/app/Models/TodoInterface';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  @ViewChild('myModal', { static: true }) addModal: ElementRef;
  elm: HTMLElement;
  title;
  todolist: IToDo[] = [];
  searchItem: string;
  completed: boolean = false;
  addTaskForm: FormGroup;
  submitted = false;
  isAddMode: boolean = false;
  isEditMode: boolean = false;
  itemId: number;
  selectedIndex: number;
  constructor(
    private _todolistService: ToDoServiceService,
    private fb: FormBuilder,
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private toastr: ToastrService
  ) {
  }
  ngOnInit() {
    //getAllToDoList items
    this.createAddTaskForm();
    this.getAllToDoListItems();
  }
  ngAfterViewInit() {
    this.elm = this.addModal.nativeElement as HTMLElement;
  }
  closeModal() {
    this.elm.classList.remove('show');
    setTimeout(() => {
      this.elm.style.width = '0';
    }, 75);
    document.body.style.overflow = 'visible';
  }
  addEditTask(item) {
    //add mode
    if (item == null) {
      this.isAddMode = true;
      this.isEditMode = false;
      this.open(null);
    }
    //edit mode
    else {
      this.isEditMode = true;
      this.isAddMode = false;
      this.itemId = item.id
      this.open(item);
    }
  }
  open(item) {
    this.elm.classList.add('show');
    this.elm.style.width = '100vw';
    document.body.style.overflow = 'hidden';
    if (item) {
      this.addTaskForm.patchValue({
        'title': item.title,
      })
    }
    ;
  }
  //Add edit Task
  onSubmit() {
    this.submitted = true;
    if (this.addTaskForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.addTask();
    }
    else {
      this.editTask()
    }
  }
  addTask() {
    var formValue: IToDo;
    formValue = this.addTaskForm.value;
    formValue.completed = false;
    formValue.userId = 1;
    formValue.id = this.todolist.length + 1;
    this.todolist.push(formValue)
    this.toastr.success('Task added Sucssesfuly');
    this.closeModal();
    this.addTaskForm.reset();
  }
  editTask() {
    this.todolist.forEach(res => {
      if (res.id == this.itemId) {
        res.title = this.addTaskForm.get('title')?.value;
      }
    })
    this.addTaskForm.reset();
    this.closeModal()
  }
  createAddTaskForm() {
    this.addTaskForm = this.fb.group({
      title: ['', Validators.required],
    });
  }
  // get all todolist items
  getAllToDoListItems() {
    this._todolistService.getAllToDos().subscribe((res) => {
      console.log(res)
      this.todolist = res;
    });
  }
  // delete item in todolist
  DeleteTask(id: any) {
    if (confirm("Are you sure to delete this task")) {
      this.todolist = this.todolist.filter(task => task.id !== id);
      this.toastr.success('Task Deleted Sucssesfuly');
    }
  }
  addCompletedTask(item) {
    item.completed = !item.completed;
  }
}

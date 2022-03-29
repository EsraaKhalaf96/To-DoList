import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map,filter } from 'rxjs/operators';
// import {ToDo} from '../../Models/TodoInterface'
@Injectable({
  providedIn: 'root'
})
export class ToDoServiceService {
  server_url= environment.apiUrl

  constructor(private http: HttpClient) { }
  getAllToDos():Observable<any>{
    console.log( this.server_url)
    return this.http.get(this.server_url + '/todos/'+'?_limit=10')
  }
  updateToDoList(id:number,data):Observable<any>{
    return this.http.put(`${ this.server_url}/${id}`,data)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map,filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ToDoServiceService {
  server_url= environment.apiUrl

  constructor(private http: HttpClient) { }
  getAllToDos():Observable<any>{
    console.log( this.server_url)
    return this.http.get(this.server_url + '/todos' )
  }
  // deleteNotes(id: any){
  //   return this.http.delete(this.server_url + `/notes/${id}`);
  // }
  // addNotes(data: any){
  //   return this.http.post(this.server_url + '/notes',data)
  // }
  // getItemDetailsById(id: any){
  //   return this.http.get(this.server_url + `/notes/${id}`)
  // }
  // editNotes(data: any,id: any){
  //   return this.http.put(this.server_url + `/notes/${id}`,data)
  // }
}

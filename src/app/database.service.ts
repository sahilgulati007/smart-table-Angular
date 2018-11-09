import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DatabaseService {

  constructor(private http:HttpClient) { }

  onView(){
    return this.http.get("http://localhost/angularapi/view_stud.php");
  }
  onUpdate(data){
    return this.http.post("http://localhost/angularapi/apiclass.php?action=updstud",data);
  }
  onDelete(data){
    return this.http.get("http://localhost/angularapi/apiclass.php?action=delstud&id="+data);
  }
  onInsert(data){
    return this.http.post("http://localhost/angularapi/apiclass.php?action=insstud",data);
  }
}

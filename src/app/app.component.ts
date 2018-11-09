import { Component } from '@angular/core';
import {DatabaseService} from "./database.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data;
  settings = {
    delete: {
      confirmDelete: true,
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      sid: {
        title: 'ID'
      },
      snm: {
        title: 'Full Name'
      },
      sad: {
        title: 'User Name'
      },

    }
  };
  constructor(private database: DatabaseService) {
    this.onView();
  }
  onView(){
    this.database.onView().subscribe((res)=>{
      this.data=res;
      console.log(this.data);
    });
  }

  onSaveConfirm(event) {
    console.log(event.newData['snm']);
    let frm = new FormData();
    frm.append('id',event.newData['sid']);
    frm.append('nm',event.newData['snm']);
    frm.append('ad',event.newData['sad']);
    this.database.onUpdate(frm).subscribe((res)=>{
      console.log(res);
      this.onView();
    });
  }
  onDeleteConfirm(event){
    console.log(event.data['sid']);
    this.database.onDelete(event.data['sid']).subscribe((res)=>{
      //console.log(res);
      //this.onView();
      event.confirm.resolve(event.source.data);
    });
  }
  onCreateConfirm(event){
    console.log("add");
    let frm=new FormData();
    frm.append('nm',event.newData['snm']);
    frm.append('ad',event.newData['sad']);
    this.database.onInsert(frm).subscribe((res)=>{
      event.confirm.resolve(event.newData);
      this.onView();
    });
  }


}

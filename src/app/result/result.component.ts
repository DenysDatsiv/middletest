import { PersonData } from './../models/person-data';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  @Input() formData: PersonData[];
  searchedData: string = '';
  editIndex: number = -1;
  editUserData: PersonData ;

  constructor() { }

  onDelete(index: number) {
    this.formData.splice(index, 1)
    localStorage.setItem("formData", JSON.stringify(this.formData));
  }

  onEdit(index: number) {
    this.editIndex = index;
    this.editUserData = Object.assign({}, this.formData[index]);
  }

  onReturn() {
    this.editIndex = -1;
  }

  onSave(index: number) {
    this.formData[index] = this.editUserData;
    this.onReturn();
    localStorage.setItem("formData", JSON.stringify(this.formData));
  }
  
}
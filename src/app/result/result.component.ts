import { PersonData } from './../models/person-data';
import { Component, Input, OnInit } from '@angular/core';;
import { ArrayCheckingService } from '../services/array-checking.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() formData: PersonData[];
  @Input() emptyMessageStatus: boolean;
  userEditForm: FormGroup;
  searchedData: string;
  editIndex: number = -1;
  editUserData: PersonData;

  constructor(private arrayCheckingService: ArrayCheckingService, private validationService: ValidationService) { }

  ngOnInit(): void {
    this.userEditForm = new FormGroup({
      'username': new FormControl('', [
        Validators.required,
        this.validationService.firstLetterCapital,
        Validators.pattern("^^([a-zA-Z ]+|[А-ЩЬЮЯҐЄІЇа-щьюяґєії][а-щьюяґєії]*)$"),
        Validators.maxLength(20)
      ]),

      'email': new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), Validators.maxLength(30)
      ])
    });
  }

  onDelete(index: number) {
    this.formData.splice(index, 1)
    localStorage.setItem("formData", JSON.stringify(this.formData));
    this.emptyMessageStatus = this.arrayCheckingService.isArrayEmpty(this.formData);
  }

  onEdit(index: number) {
    this.editIndex = index;
    this.editUserData = Object.assign({}, this.formData[index]);

    this.userEditForm.setValue({
      'username': this.editUserData.username,
      'email': this.editUserData.email
    });
  }

  onReturn() {
    this.editIndex = -1;
  }

  onSave(index: number) {
    const editedData: PersonData = {
      username: this.userEditForm.value.username,
      email: this.userEditForm.value.email
    };
    this.formData[index] = editedData;
    this.onReturn();
    localStorage.setItem("formData", JSON.stringify(this.formData));
  }

}

import { PersonData } from './../models/person-data';
import { ValidationService } from './../services/validation.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {
  formData: PersonData[] = JSON.parse(localStorage.getItem("formData")) || [];
  emailExisting: boolean;
  userRegistrationForm: FormGroup;

  constructor(private validationService: ValidationService) { }

  ngOnInit(): void {
    this.userRegistrationForm = new FormGroup({

      'username': new FormControl("", [
        Validators.required,
        this.validationService.firstLetterCapital,
        Validators.pattern("^[a-zA-Z ]+$")
      ]),

      'email': new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ])

    });
  }

  onSubmit() {
    const valueFromInput = this.userRegistrationForm.value;
    this.emailExisting = this.formData.some((item) => item.email == this.userRegistrationForm.value.email)
    if (!this.emailExisting) {
      this.formData.unshift(valueFromInput)
      localStorage.setItem("formData", JSON.stringify(this.formData));
    }
  }

}

import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  
  firstLetterCapital(input: FormControl) {
    if (input.value && input.value.charAt(0) === input.value.charAt(0).toLowerCase()) {
      return { firstLetterCapital: true }
    }
    else {
      return null
    }
  }
  
  
}
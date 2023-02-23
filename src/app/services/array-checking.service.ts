import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayCheckingService {

  constructor() { }
  isArrayEmpty(arr) {
    return arr.length === 0;
  }
}

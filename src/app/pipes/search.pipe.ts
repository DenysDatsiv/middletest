import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(formData: string[], searchedValue?: string): string[] {
    if (!formData) return null;
    if (!searchedValue) return formData;
    searchedValue = searchedValue.toLowerCase();
    return formData.filter((item: any) => { return JSON.stringify(item).toLocaleLowerCase().includes(searchedValue) })
  }

}
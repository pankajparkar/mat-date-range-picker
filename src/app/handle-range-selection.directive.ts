import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '.mat-calendar-table'
})
export class HandleRangeSelectionDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  hover (event) {
    console.log(event)
  }

}

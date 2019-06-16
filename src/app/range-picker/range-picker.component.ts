import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, merge, combineLatest, debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'drp-range-picker',
  templateUrl: './range-picker.component.html',
  styleUrls: ['./range-picker.component.css']
})
export class RangePickerComponent implements OnInit {

  @ViewChild('range', {read: ElementRef}) range;
  @ViewChild('picker') picker;
  @ViewChild('pickerToggle', {read: ElementRef}) pickerToggle;
  opened: boolean = false;
  value;

  ngAfterViewInit () {
    console.log('ngAfterViewInit', this.picker)
  }
  dateChange (e) {
    this.range.nativeElement.value = e.value;
    setTimeout(() => {
      // TODO: Don't close the popup
      this.pickerToggle.nativeElement.click()
    },1000)
  }

  datePickerOpened () {
    setTimeout(this.bindEvents)
  }

  ngOnInit () {
  }

  bindEvents () {
    // TODO: change it to use Renderer2
    const matCalendarTable = document.querySelectorAll(".mat-calendar-table tbody")
    console.log(matCalendarTable)
    
    const enter = fromEvent(matCalendarTable, "mouseenter")
    const leave = fromEvent(matCalendarTable, "mouseleave")
    const move  = fromEvent(matCalendarTable, "mousemove")
    const entered = enter.pipe(
      map(_ => true),
      merge(
        leave.pipe(
          map(_ => false)
        )
      )
    )
    
    move
      .pipe(
        combineLatest(entered),
        debounceTime(500),
        filter(([e, b]) => {
          console.log(e, b)
          return b
        }),
        map(([e, _]) => console.log(e, _))
      )
  }

}

import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, merge, combineLatest, debounceTime, filter } from 'rxjs/operators';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'drp-range-picker',
  templateUrl: './range-picker.component.html',
  styleUrls: ['./range-picker.component.css']
})
export class RangePickerComponent implements OnInit {

  @ViewChild('startDate', {read: MatDatepicker}) startDate;
  @ViewChild('endDate', {read: MatDatepicker}) endDate;
  ngAfterViewInit () {
    console.log('ngAfterViewInit', this.startDate)
  }
  dateChange (e) {
    debugger
    console.log(this.startDate)
    console.log(this.endDate)
    // this.range.nativeElement.value = e.value;
    // setTimeout(() => {
    //   // TODO: Don't close the popup
    //   this.pickerToggle.nativeElement.click()
    // },1000)
  }

  closedStream () {
    debugger
    console.log(this.startDate)
    console.log(this.endDate)
  }

  datePickerOpened () {
    debugger
    console.log(this.startDate)
    console.log(this.endDate)

    // setTimeout(this.bindEvents)
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker, MatCalendar } from '@angular/material/datepicker';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'drp-range-picker',
  templateUrl: './range-picker.component.html',
  styleUrls: ['./range-picker.component.css']
})
export class RangePickerComponent implements OnInit {

  @ViewChild('startDate', {read: MatCalendar}) startDate;
  @ViewChild('endDate', {read: MatCalendar}) endDate;
  dateRange: FormGroup;
  startAt = new Date();
  endAt;

  constructor (private fb: FormBuilder, private dateAdapter: DateAdapter<Date>) {}

  ngOnInit () {
    const endAt = this.dateAdapter.addCalendarMonths(this.startAt, 1)
    this.endAt = new Date(endAt.getFullYear(), endAt.getMonth(), 1)
    this.dateRange = this.fb.group({
      startDate: new FormControl(),
      endDate: new FormControl()
    })
  }

  selectStartDate(date) {
    const startDate = this.dateRange.controls['startDate']
    startDate.setValue(date);
  }

  selectEndDate(date) {
    const endDate = this.dateRange.controls['endDate']
    endDate.setValue(date);
  }

  close () {
    // Fire selection vague DOM manipulation
    const endDate = this.dateRange.controls['endDate'].value.getDate(),
      startDate = this.dateRange.controls['startDate'].value.getDate();
    console.log(this.startDate, this.endDate)
    const [startMonth, endMonth] = Array.from(document.querySelectorAll('.mat-calendar-body'));
    const startMonthCells = Array.from(startMonth.querySelectorAll('.mat-calendar-body-cell'));
    const endMonthCells = Array.from(endMonth.querySelectorAll('.mat-calendar-body-cell'));
    startMonthCells.forEach((cell: HTMLElement) => {
      if (startDate <= cell.textContent) cell.style.background = 'red'
    })
    endMonthCells.forEach((cell: HTMLElement) => {
      if (endDate >= cell.textContent) cell.style.background = 'red'
    })
  }

}

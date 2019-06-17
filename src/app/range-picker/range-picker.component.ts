import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

const MONTHS = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEV: 11
}

@Component({
  selector: 'drp-range-picker',
  templateUrl: './range-picker.component.html',
  styleUrls: ['./range-picker.component.css']
})
export class RangePickerComponent implements OnInit {

  @ViewChild('startDate', {read: MatCalendar}) startDate;
  @ViewChild('endDate', {read: MatCalendar}) endDate;
  dateRange: FormGroup;
  open = false
  startAt = new Date();
  endAt;

  constructor (private fb: FormBuilder, private dateAdapter: DateAdapter<Date>) {}

  ngOnInit () {
    const endAt = this.dateAdapter.addCalendarMonths(this.startAt, 1)
    this.endAt = new Date(endAt.getFullYear(), endAt.getMonth(), 1)
    this.dateRange = this.fb.group({
      startDate: new FormControl(),
      endDate: new FormControl({
        value: null,
        disabled: true
      })
    })
  }

  selectStartDate(date) {
    const startDate = this.dateRange.controls['startDate']
    startDate.setValue(date);
    this.dateRange.get('startDate').enable();
  }

  selectEndDate(date) {
    const endDate = this.dateRange.controls['endDate']
    endDate.setValue(date);
  }

  performSelection (month, expression) {
    const cells = Array.from(month.querySelectorAll('.mat-calendar-body-cell'));
    cells.forEach(expression)
  }

  close () {
    // Fire selection vague DOM manipulation
    // TODO: refactor below
    const endDate = this.dateRange.controls['endDate'],
      startDate = this.dateRange.controls['startDate'];
    const [startMonthBody, endMonthBody] = Array.from(document.querySelectorAll('.mat-calendar-body'));
    this.startDate.stateChanges
      .subscribe(_ => this.selectRangeForStartDate(startMonthBody, startDate));
    this.endDate.stateChanges
      .subscribe(_ => this.selectRangeForEndDate(endMonthBody, endDate));
    this.selectRangeForStartDate(startMonthBody, startDate);
  }

  openRangePicker () {
    this.open = true;
  }

  private selectRangeForEndDate(endMonthBody: any, endDate) {
    this.performSelection(endMonthBody, (cell: HTMLElement) => {
      const endMonth = MONTHS[this.endDate.monthView._monthLabel];
      (endDate.value.getMonth() !== endMonth && endDate.value.getMonth() > endMonth) ||
        endDate.value.getDate() >= cell.textContent ? cell.style.background = '#a988e4' : cell.style.background = 'none';
    });
  }

  private selectRangeForStartDate(startMonthBody: any, startDate) {
    this.performSelection(startMonthBody, (cell: HTMLElement) => {
      const startMonth = MONTHS[this.startDate.monthView._monthLabel];
      (startDate.value.getMonth() !== startMonth && startDate.value.getMonth() < startMonth) ||
        startDate.value.getDate() <= cell.textContent ? cell.style.background = '#a988e4' : cell.style.background = 'none';
    });
  }
}

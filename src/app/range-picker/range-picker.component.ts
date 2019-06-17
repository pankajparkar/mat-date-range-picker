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
  endAt = this.dateAdapter.addCalendarMonths(this.startAt, 1)

  constructor (private fb: FormBuilder, private dateAdapter: DateAdapter<Date>) {}

  ngOnInit () {
    this.dateRange = this.fb.group({
      startDate: new FormControl(),
      endDate: new FormControl()
    })
  }

  selectStartDate(date) {
    const startDate = this.dateRange.controls['startDate']
    startDate.setValue(date)
  }

  selectEndDate(date) {
    const endDate = this.dateRange.controls['endDate']
    endDate.setValue(date)
  }

  close () {
    console.log('close')
  }

}

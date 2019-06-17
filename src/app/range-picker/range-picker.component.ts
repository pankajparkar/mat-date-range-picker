import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'drp-range-picker',
  templateUrl: './range-picker.component.html',
  styleUrls: ['./range-picker.component.css']
})
export class RangePickerComponent implements OnInit {

  @ViewChild('startDate', {read: MatDatepicker}) startDate;
  @ViewChild('endDate', {read: MatDatepicker}) endDate;
  dateRange: FormGroup;
  startAt = new Date();
  endAt = this.dateAdapter.addCalendarMonths(this.startAt, 1)

  constructor (private fb: FormBuilder, private dateAdapter: DateAdapter<Date>) {}
  ngAfterViewInit () {
    console.log('ngAfterViewInit', this.startDate)
  }

  ngOnInit () {
    this.dateRange = this.fb.group({
      startDate: new FormControl(),
      endDate: new FormControl()
    })
  }

  select(event) {
    console.log('select', event)
  }

  close () {
    console.log('close')
  }

}

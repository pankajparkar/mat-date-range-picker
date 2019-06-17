import {Component, OnInit, ViewChild, forwardRef} from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import {DateAdapter} from '@angular/material/core';
import { MONTHS, HIGHTLIGHT_COLOR } from '../helpers/constants';

export const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RangePickerComponent),
  multi: true,
};

@Component({
  selector: 'drp-range-picker',
  templateUrl: './range-picker.component.html',
  styleUrls: ['./range-picker.component.css'],
  providers: [DEFAULT_VALUE_ACCESSOR],
})
export class RangePickerComponent implements ControlValueAccessor, OnInit {
  @ViewChild('startDate', {read: MatCalendar}) startDate;
  @ViewChild('endDate', {read: MatCalendar}) endDate;
  dateRange: FormGroup;
  open = false;
  startAt = new Date();
  endAt;
  onChange: any = () => {}
  onTouch: any = () => {}

  constructor(
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>
  ) {}

  writeValue(value) {
    if (value) {
      this.dateRange.patchValue(value)
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  selectStartDate(date) {
    const startDate = this.dateRange.controls['startDate'];
    startDate.setValue(date);
    this.dateRange.get('startDate').enable();
    this.onChange();
  }

  selectEndDate(date) {
    const endDate = this.dateRange.controls['endDate'];
    endDate.setValue(date);
    this.onChange();
  }

  performSelection(month, expression) {
    const cells = Array.from(month.querySelectorAll('.mat-calendar-body-cell'));
    cells.forEach(expression);
  }

  close() {
    // Fire selection vague DOM manipulation
    // TODO: refactor below
    const endDate = this.dateRange.controls['endDate'],
      startDate = this.dateRange.controls['startDate'];
    const [startMonthCalendar, endMonthCalendar] = Array.from(
      document.querySelectorAll('.mat-calendar-body')
    );
    this.startDate.stateChanges.subscribe(_ =>
      this.selectRangeForStartDate(startMonthCalendar, startDate)
    );
    this.endDate.stateChanges.subscribe(_ =>
      this.selectRangeForEndDate(endMonthCalendar, endDate)
    );
    this.selectRangeForStartDate(startMonthCalendar, startDate);
  }

  openRangePicker() {
    this.open = true;
    this.onTouch();
  }

  private selectRangeForEndDate(endMonthCalendar: any, endDate) {
    this.performSelection(endMonthCalendar, (cell: HTMLElement) => {
      const endMonth = MONTHS[this.endDate.monthView._monthLabel];
      (endDate.value.getMonth() !== endMonth &&
        endDate.value.getMonth() > endMonth) ||
      endDate.value.getDate() >= cell.textContent
        ? (cell.style.background = HIGHTLIGHT_COLOR)
        : (cell.style.background = 'none');
    });
  }

  private selectRangeForStartDate(startMonthCalendar: any, startDate) {
    this.performSelection(startMonthCalendar, (cell: HTMLElement) => {
      const startMonth = MONTHS[this.startDate.monthView._monthLabel];
      (startDate.value.getMonth() !== startMonth &&
        startDate.value.getMonth() < startMonth) ||
      startDate.value.getDate() <= cell.textContent
        ? (cell.style.background = HIGHTLIGHT_COLOR)
        : (cell.style.background = 'none');
    });
  }

  ngOnInit() {
    const endAt = this.dateAdapter.addCalendarMonths(this.startAt, 1);
    this.endAt = new Date(endAt.getFullYear(), endAt.getMonth(), 1);
    this.dateRange = this.fb.group({
      startDate: new FormControl(),
      endDate: new FormControl({
        value: null,
        disabled: true,
      }),
    });
  }
}

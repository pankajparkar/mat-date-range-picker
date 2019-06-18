import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { MONTHS, HIGHTLIGHT_COLOR } from './helpers/constants';

@Directive({
  selector: '[drpHighlightRange]'
})
export class HighlightRangeDirective {

  @Input() startDate;
  @Input() endDate;
  @Input() startDateCalendar;
  @Input() endDateCalendar;

  constructor(private elRef: ElementRef) { }

  ngOnInit () {
    console.log('Hurray')
  }

  @HostListener('click', ['$event'])
  highlight ({target}) {
    // Delegation 
    if (target.className.indexOf('mat-calendar-body-cell') > -1 && this.startDate.value && this.endDate.value) {
      const calendars: any = Array.from(
        this.elRef.nativeElement.querySelectorAll('.mat-calendar-body')
      );
      this.startDateCalendar.stateChanges
        .pipe(debounceTime(100))
        .subscribe(_ =>
          this.selectRangeForStartDate(calendars, this.startDate, this.endDate)
        );
      this.endDateCalendar.stateChanges
        .pipe(debounceTime(100)).subscribe(_ =>
          this.selectRangeForEndDate(calendars, this.startDate, this.endDate)
        );
      this.selectRangeForStartDate(calendars, this.startDate, this.endDate);
      this.selectRangeForEndDate(calendars, this.startDate, this.endDate);
    }
  }

  performSelection(month, expression) {
    const cells = Array.from(month.querySelectorAll('.mat-calendar-body-cell'));
    cells.forEach(expression);
  }

  private selectRangeForStartDate([startMonthCalendar, endMonthCalendar], startDate, endDate) {
    this.performSelection(startMonthCalendar, (cell: HTMLElement) => {
      const startMonth = MONTHS[this.startDateCalendar.monthView._monthLabel];
      const endMonth = MONTHS[this.endDateCalendar.monthView._monthLabel];
      const date = startDate.value, month = date.getMonth();
      date.getDate() <= cell.textContent && date.getMonth() <= startMonth && endDate.value.getMonth() >= month
        ? (cell.style.background = HIGHTLIGHT_COLOR)
        : (cell.style.background = 'none');
    });
  }

  private selectRangeForEndDate([startMonthCalendar, endMonthCalendar], startDate, endDate) {
    this.performSelection(endMonthCalendar, (cell: HTMLElement) => {
      const startMonth = MONTHS[this.startDateCalendar.monthView._monthLabel];
      const endMonth = MONTHS[this.endDateCalendar.monthView._monthLabel];
      const date = endDate.value, month = date.getMonth();
      date.getDate() >= cell.textContent && date.getMonth() >= endMonth && startDate.value.getMonth() <= month
        ? (cell.style.background = HIGHTLIGHT_COLOR)
        : (cell.style.background = 'none');
    });
  }

}

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
      const [startMonthCalendar, endMonthCalendar] = Array.from(
        this.elRef.nativeElement.querySelectorAll('.mat-calendar-body')
      );
      this.startDateCalendar.stateChanges
        .pipe(debounceTime(100))
        .subscribe(_ =>
          this.selectRangeForStartDate(startMonthCalendar, this.startDate)
        );
      this.endDateCalendar.stateChanges
        .pipe(debounceTime(100)).subscribe(_ =>
          this.selectRangeForEndDate(endMonthCalendar, this.endDate)
        );
      this.selectRangeForStartDate(startMonthCalendar, this.startDate);
      this.selectRangeForEndDate(endMonthCalendar, this.endDate);
    }
  }

  performSelection(month, expression) {
    const cells = Array.from(month.querySelectorAll('.mat-calendar-body-cell'));
    cells.forEach(expression);
  }

  private selectRangeForEndDate(endMonthCalendar, endDate) {
    this.performSelection(endMonthCalendar, (cell: HTMLElement) => {
      const endMonth = MONTHS[this.endDateCalendar.monthView._monthLabel];
      (endDate.value.getMonth() !== endMonth &&
        endDate.value.getMonth() > endMonth) ||
      endDate.value.getDate() >= cell.textContent
        ? (cell.style.background = HIGHTLIGHT_COLOR)
        : (cell.style.background = 'none');
    });
  }

  private selectRangeForStartDate(startMonthCalendar, startDate) {
    this.performSelection(startMonthCalendar, (cell: HTMLElement) => {
      const startMonth = MONTHS[this.startDateCalendar.monthView._monthLabel];
      (startDate.value.getMonth() !== startMonth &&
        startDate.value.getMonth() < startMonth) ||
      startDate.value.getDate() <= cell.textContent
        ? (cell.style.background = HIGHTLIGHT_COLOR)
        : (cell.style.background = 'none');
    });
  }

}

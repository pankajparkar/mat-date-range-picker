import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  isLeapYear (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  getDaysInMonth (year, month) {
    return [
      31,
      this.isLeapYear(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ][month];
  };

  addMonths (date, value) {
    var n = date.getDate();
    date.setDate(1);
    date.setMonth(date.getMonth() + value);
    date.setDate(Math.min(n, this.getDaysInMonthFromDate(date)));
    return date;
  };

  getDaysInMonthFromDate = function(date) {
    return this.getDaysInMonth(date.getFullYear(), date.getMonth());
  };
  
}
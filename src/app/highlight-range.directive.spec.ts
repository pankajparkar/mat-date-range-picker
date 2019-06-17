import { HighlightRangeDirective } from './highlight-range.directive';
import { ElementRef } from '@angular/core';

describe('HighlightRangeDirective', () => {
  it('should create an instance', () => {
    const directive = new HighlightRangeDirective(<ElementRef>{});
    expect(directive).toBeTruthy();
  });
});

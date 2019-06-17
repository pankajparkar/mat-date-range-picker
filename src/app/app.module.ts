import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomMaterialModule } from './custom-material.module';
import { HandleRangeSelectionDirective } from './handle-range-selection.directive';
import { RangePickerComponent } from './range-picker/range-picker.component';
import { HighlightRangeDirective } from './highlight-range.directive'

@NgModule({
  declarations: [
    AppComponent,
    HandleRangeSelectionDirective,
    RangePickerComponent,
    HighlightRangeDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    // Material module
    CustomMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

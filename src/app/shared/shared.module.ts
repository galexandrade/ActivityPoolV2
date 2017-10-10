import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EqualValidator } from './equal-validator.directive';
import { EmailValidator } from './email-validator.directive';
import { DateValidator } from './date-validator.directive';
import { TimeValidator } from './time-validator.directive';
import { DateMaskDirective } from './date-mask.directive';
import { TimeMaskDirective } from './time-mask.directive';
import { TimePipe } from './time.pipe';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EqualValidator,
    EmailValidator,
    DateValidator,
    TimeValidator,
    DateMaskDirective,
    TimeMaskDirective,
    TimePipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EqualValidator,
    EmailValidator,
    DateValidator,
    TimeValidator,
    DateMaskDirective,
    TimeMaskDirective,
    TimePipe
  ]
})
export class SharedModule { }

import { Directive, forwardRef, Attribute, ElementRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
  selector: '[validateTime][formControlName],[validateTime][formControl],[validateTime][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => TimeValidator), multi: true }
  ]
})
export class TimeValidator implements Validator {
  constructor( @Attribute('validateTime') public validateTime: string,
               private element: ElementRef) { }
  static TIME_REGEXP = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;

  validate(c: AbstractControl): { [key: string]: any } {
    let value: string = this.element.nativeElement.value;
    if(value == null || value == '') return null;
    return TimeValidator.TIME_REGEXP.test(value) ? null : {
      validateTime: {
        valid: false
      }
    };
  }
}

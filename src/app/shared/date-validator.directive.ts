import { Directive, forwardRef, Attribute, ElementRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
  selector: '[validateDate][formControlName],[validateDate][formControl],[validateDate][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateValidator), multi: true }
  ]
})
export class DateValidator implements Validator {
  constructor( @Attribute('validateDate') public validateDate: string,
               private element: ElementRef) { }
  static DATE_REGEXP = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4})$/;

  validate(c: AbstractControl): { [key: string]: any } {
    let value: string = this.element.nativeElement.value;
    if(value == null || value == '') return null;

    return DateValidator.DATE_REGEXP.test(value) ? null : {
      validateDate: {
        valid: false
      }
    };
  }
}

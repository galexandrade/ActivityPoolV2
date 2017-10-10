import { Directive, forwardRef, Attribute, ElementRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
  selector: '[validateEmail][formControlName],[validateEmail][formControl],[validateEmail][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }
  ]
})
export class EmailValidator implements Validator {
  constructor( @Attribute('validateEmail') public validateEmail: string,
                private element: ElementRef) { }
  static EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  validate(c: AbstractControl): { [key: string]: any } {
    let value: string = this.element.nativeElement.value;
    if(value == null || value == '') return null;
    // self value (e.g. retype password)
    return EmailValidator.EMAIL_REGEXP.test(c.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }
}

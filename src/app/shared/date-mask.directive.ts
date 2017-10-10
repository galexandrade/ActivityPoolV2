import { Directive, ElementRef, Renderer, forwardRef, OnInit, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[date-mask][formControlName],[date-mask][formControl],[date-mask][ngModel]',
  host: {
    '(input)': 'onInput($event)',
    '(blur)': '_onTouched()'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateMaskDirective),
      multi: true
    }
  ]
})
export class DateMaskDirective implements ControlValueAccessor, OnInit {

  static PATTERN: RegExp = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4})$/;

  _onTouched = () => {}
  _onChange = (_: any) => {}

  constructor(private renderer: Renderer, private element: ElementRef) {}

  ngOnInit(): void {
    this.element.nativeElement.maxLength = 10;
    this.element.nativeElement.placeholder = '__/__/____';
  }

  writeValue(value: any): void {
    if (value) {
      this.element.nativeElement.value = this.format(value);
    }
  }

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn }

  registerOnTouched(fn: () => any): void { this._onTouched = fn }

  onInput($event: any): void {
    let masked: string = this.mask($event.target.value);
    this.element.nativeElement.value = masked;
    this._onChange(this.parse(masked));
  }

  setDisabledState(isDisabled: boolean) {
    this.renderer.setElementProperty(this.element.nativeElement, 'disabled', isDisabled)
  }

  mask(value: string): string {
    if(value) {
      let result:string[] = /(\d{1,8})/.exec(value.replace(/\D/g,''));
      if(result) {
        value = result[1];
        value = value.replace( /^(\d{2})(\d{2})(\d{1,4})$/,'$1/$2/$3');
        value = value.replace( /^(\d{2})(\d{1,2})$/,'$1/$2');
      }
    }
    return value;
  }

  parse(value: string):string {
    let date:string = null;
    let result:string[] = DateMaskDirective.PATTERN.exec(value);
    if(result) {
      let day: string = result[1];
      day = day.length == 1 ? '0' + day : day;
      let month: string = result[2];
      month = month.length == 1 ? '0' + month : month;
      date = result[3] + '-' + month + '-' + day;
    }
    return date;
  }

  format(date: string): string {
    let formated: string = "";
    if(date && date != '') {
      formated += date.substring(8,10);
      formated += '/';
      formated += date.substring(5,7);
      formated += '/';
      formated += date.substring(0,4);
    }
    return formated;
  }
}

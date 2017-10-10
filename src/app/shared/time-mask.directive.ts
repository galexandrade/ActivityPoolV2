import { Directive, ElementRef, Renderer, forwardRef, OnInit, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[time-mask][formControlName],[time-mask][formControl],[time-mask][ngModel]',
  host: {
    '(input)': 'onInput($event)',
    '(blur)': '_onTouched()'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeMaskDirective),
      multi: true
    }
  ]
})
export class TimeMaskDirective implements ControlValueAccessor, OnInit {

  static PATTERN: RegExp = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;

  _onTouched = () => {}
  _onChange = (_: any) => {}

  constructor(private renderer: Renderer, private element: ElementRef) {}

  ngOnInit(): void {
    this.element.nativeElement.maxLength = 5;
    this.element.nativeElement.placeholder = '__:__';
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
      let result:string[] = /(\d{1,4})/.exec(value.replace(/\D/g,''));
      if(result) {
        value = result[1];
        value = value.replace( /^(\d{2})(\d{1,2})$/,'$1:$2');
      }
    }
    return value;
  }

  parse(value: string):string {
    let time:string = null;
    let result:string[] = TimeMaskDirective.PATTERN.exec(value);
    if(result) {
      time = result[1] + ':' + result[2] + ':00';
    }
    return time;
  }

  format(time: string): string {
    let formated: string = "";
    if(time && time != '') {
      let arr: string[] = time.split(':');
      formated += arr[0] + ':' + arr[1];
    }
    return formated;
  }
}

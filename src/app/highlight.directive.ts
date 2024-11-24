import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @HostBinding('class')
  myClass = '';
  @HostListener('mouseenter') onMouseEnter() {
    this.myClass = 'highlight';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.myClass = '';
  }
}

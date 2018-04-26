import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[app-DropDown]'
})
export class DropDownDirective {
    @HostBinding('class.open') isOpen: boolean = false;
    @HostListener('click') onclick() {
        this.isOpen = !this.isOpen;
    }
}
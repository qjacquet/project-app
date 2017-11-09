import { Directive, HostListener, Input } from '@angular/core';
import { NavbarVerticalService } from './navbar-vertical.service';
import { NavbarVerticalComponent } from './navbar-vertical.component';

@Directive({
    selector: '[NavbarVertical]'
})
export class NavbarVerticalToggleDirective
{
    @Input() NavbarVertical: string;
    navbar: NavbarVerticalComponent;

    constructor(private navbarService: NavbarVerticalService)
    {
    }

    @HostListener('click')
    onClick()
    {
        this.navbar = this.navbarService.getNavBar();

        if ( !this.navbar[this.NavbarVertical] )
        {
            return;
        }

        this.navbar[this.NavbarVertical]();
    }
}

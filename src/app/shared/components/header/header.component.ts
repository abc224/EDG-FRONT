import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

/***
 * Header Component
 */
export class HeaderComponent implements OnInit {
  @Input() navClass!: string;
  @Input() buttonList!: boolean;
  @Input() sliderTopbar!: boolean;
  @Input() isdeveloper!: boolean;
  @Input() shopPages!: boolean;
  isLoggedIn = false;
  accountRoute = false;
  constructor(private router: Router, private modalService: NgbModal) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
      }
    });
  }

  isCondensed = false;

  ngAfterViewInit() {
    this._activateMenuDropdown();
  }

  ngOnInit(): void {}

  logout() {}

  _activateMenuDropdown() {
    /**
     * Menu activation reset
     */
    const resetParent = (el: Element) => {
      el.classList.remove('active');
      const parent = el.parentElement;
    };
    let links = document.getElementsByClassName('nav-link-ref');
    let matchingMenuItem = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // reset menu
      resetParent(links[i]);
    }
    for (let i = 0; i < links.length; i++) {
      // if (window.location.pathname === links[i]['pathname']) {
      matchingMenuItem = links[i];
      //  break;
      // }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add('active');
      const parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
    }
  }

  /**
   * Window scroll method
   */
  // tslint:disable-next-line: typedef
  windowScroll() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      document.getElementById('topnav')!.classList.add('nav-sticky');
    } else {
      document.getElementById('topnav')!.classList.remove('nav-sticky');
    }
    if (document.getElementById('back-to-top')) {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        document.getElementById('back-to-top')!.style.display = 'inline';
      } else {
        document.getElementById('back-to-top')!.style.display = 'none';
      }
    }
  }
  /**
   * Toggle menu
   */
  toggleMenu() {
    this.isCondensed = !this.isCondensed;
    if (this.isCondensed) {
      document.getElementById('navigation')!.style.display = 'block';
    } else {
      document.getElementById('navigation')!.style.display = 'none';
    }
  }

  /**
   * Menu clicked show the submenu
   */
  onMenuClick(event: any) {
    event.preventDefault();
    const nextEl = event.target.nextSibling.nextSibling;
    if (nextEl && !nextEl.classList.contains('open')) {
      const parentEl = event.target.parentNode;
      if (parentEl) {
        parentEl.classList.remove('open');
      }
      nextEl.classList.add('open');
    } else if (nextEl) {
      nextEl.classList.remove('open');
    }
    return false;
  }

  developerModal(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  wishListModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
}

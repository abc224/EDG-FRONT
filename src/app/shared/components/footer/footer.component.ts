import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  @Input() footerVariant!: string;
  @Input() hideFooter!: boolean;

  //Get Year
  year = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {}
}

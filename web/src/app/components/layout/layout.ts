import { Component } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import { RouterOutlet} from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  imports: [MenubarModule, RouterOutlet],
})
export default class Layout {
  model: MenuItem[] = [
    { label: 'All Contracts', routerLink: '/contracts'},
    { label: 'Create Contract', routerLink: '/contracts/create'},
  ]
}

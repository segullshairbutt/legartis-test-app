import { Component } from '@angular/core';
import Layout from './components/layout/layout';

@Component({
  selector: 'app-root',
  template: ` <app-layout /> `,
  imports: [Layout],
})
export class App {}

import { Component } from "@angular/core";

@Component({
  selector: "page-not-found",
  template: `
    <div class="not-found">
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  `,
  styles: [`
    .not-found {
      text-align: center;
      margin-top: 50px;
    }
    .not-found h1 {
      font-size: 48px;
      margin-bottom: 20px;
    }
    .not-found p {
      font-size: 18px;
    }
  `]
})
export default class PageNotFound {}
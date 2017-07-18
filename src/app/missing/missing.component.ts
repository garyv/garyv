import { Component } from '@angular/core';

@Component({
  selector: 'app-missing',
  styleUrls: ['./missing.component.css'],
  template: `
    <div class='dialog'>
      <div>
        <h1>The page you were looking for doesn't exist.</h1>
        <p>You may have mistyped the address or the page may have moved.</p>
      </div>
      <p>Return to <a href='/'>Homepage</a>.</p>
    </div>`
})
export class MissingComponent { }

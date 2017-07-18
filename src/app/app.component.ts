import { Component } from '@angular/core';

import { LinkService } from './link/link.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  ngAfterViewChecked() {
    LinkService.newTabExternalLinks();
  }
}

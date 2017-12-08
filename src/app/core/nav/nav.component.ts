import { Component } from '@angular/core';

import { LoadingService } from '../loading.service';

@Component({
  selector: 'solomon-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isLoading = false;

  constructor (private loadingService: LoadingService) {
    loadingService.status$.subscribe(status => this.isLoading = status);
  }

}
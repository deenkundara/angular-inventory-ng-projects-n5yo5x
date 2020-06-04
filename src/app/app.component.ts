import { Component } from '@angular/core';
import { ProductsService, IProduct } from './products.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  productsLength$: Observable<number>;

  constructor(private productsService: ProductsService) {
    this.productsLength$ = productsService.productsLength$;
  }
}

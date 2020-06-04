import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ProductsService } from './products.service';
import { ProductComponent } from './product/product.component';

import '@clr/icons/shapes/technology-shapes';
import { ProductsComponent } from './products/products.component';
import { DeleteProductModalComponent } from './delete-product-modal/delete-product-modal.component';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, BrowserAnimationsModule, ClarityModule ],
  declarations: [ AppComponent, HelloComponent, ProductComponent, ProductsComponent, DeleteProductModalComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ProductsService]
})
export class AppModule { }

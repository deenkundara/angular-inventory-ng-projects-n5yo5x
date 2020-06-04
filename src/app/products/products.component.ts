import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductsService, IProduct } from './../products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {

  productOpen = false;
  delete = false;
  productToBeDeleted;
  selectedProduct: IProduct;
  products$: Observable<IProduct[]> = this.productsService.products$;

  constructor(private productsService: ProductsService) {
  }

  addProduct() {
    this.productOpen = true;
    this.selectedProduct = undefined;
  }

  onDelete(product) {
    this.delete = true;
    this.productToBeDeleted = product;
  }

  onEdit(product) {
    this.productOpen = true;
    this.selectedProduct = product;
  }

  confirmDelete() {
    this.delete = false;
    this.productsService.removeProduct(this.productToBeDeleted);
  }

  handleCancel() {
    this.delete = false;
  }

  handleFinish(event) {
    if (event && event.product) {
      if (this.selectedProduct) {
        this.productsService.editProduct(this.selectedProduct.id, event.product);
      } else {
        this.productsService.addProduct(event.product);
      }
    }
    
    this.productOpen = false;
  }

}
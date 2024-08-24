import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductCart } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products = new BehaviorSubject<ProductCart[]>([]);
  cartProducts$ = this.products.asObservable();

  constructor() { }

  getProducts(): ProductCart[] {
    return this.products.getValue();
  }

  getProductById(id: number): ProductCart | null {
    return this.getProducts().find(cartProduct => cartProduct.id === id) ?? null;
  }

  addProduct(product: ProductCart): void {
    const currentProducts = this.getProducts();
    this.products.next([...currentProducts, product]);
  }

  removeProduct(idProduct: number): void {
    const currentProducts = this.getProducts().filter(cartProduct => cartProduct.id !== idProduct);
    this.products.next(currentProducts);
  }
}

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
    const updatedCart = [...currentProducts, product];

    this.products.next(updatedCart);
    this.saveCart(updatedCart);
  }

  removeProduct(idProduct: number): void {
    const currentProducts = this.getProducts().filter(cartProduct => cartProduct.id !== idProduct);
    this.products.next(currentProducts);
    this.saveCart(currentProducts);
  }

  saveCart(cart: ProductCart[]): void {
    if (this.isBrowser()) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  loadCart(): void {
    if (this.isBrowser()) {
      const savedCart = localStorage.getItem('cart');
      this.products.next(savedCart ? JSON.parse(savedCart) : []);
    }
  }

  clearCart() {
    this.products.next([]);
    if (this.isBrowser()) {
      localStorage.removeItem('cart');
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}

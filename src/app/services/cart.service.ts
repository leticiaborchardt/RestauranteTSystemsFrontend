import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductCart } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = 'http://localhost:8080/api/cart';
  private products = new BehaviorSubject<ProductCart[]>([]);
  cartProducts$ = this.products.asObservable();

  constructor(private http: HttpClient) { }

  loadCartProducts(): void {
    this.http.get<ProductCart[]>(this.url).subscribe(response => this.products.next(response));
  }

  getProducts(): ProductCart[] {
    return this.products.getValue();
  }

  getProductById(id: number): ProductCart | null {
    return this.getProducts().find(cartProduct => cartProduct.id === id) ?? null;
  }

  addProduct(product: ProductCart): boolean {
    this.http.post<any>(this.url, product).subscribe({
      next: () => {
        const currentProducts = this.getProducts();
        this.products.next([...currentProducts, product]);

        return true;
      },
      error: error => console.error(error)
    });

    return false;
  }

  removeProduct(idProduct: number): void {
    this.http.delete<ProductCart[]>(`${this.url}/${idProduct}`).subscribe({
      next: () => this.products.next(this.getProducts().filter(cartProduct => cartProduct.id !== idProduct)),
      error: error => console.error(error)
    }
    );
  }

  clearCart(): boolean {
    this.http.delete<ProductCart[]>(`${this.url}/clear`).subscribe({
      next: () => {
        this.products.next([]);
        return true;
      },
      error: error => console.error(error)
    });

    return false;
  }
}

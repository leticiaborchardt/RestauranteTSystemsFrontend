import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { PagedResponse } from '../models/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getProducts(page: number, size: number): Observable<PagedResponse<Product>> {
    return this.http.get<PagedResponse<Product>>(`${this.url}?page=${page}&size=${size}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}

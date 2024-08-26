import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewProduct, Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { PagedResponse } from '../models/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getProducts(page: number, size: number, categoryId?: number, minPrice?: number, maxPrice?: number): Observable<PagedResponse<Product>> {
    let params = new HttpParams();

    if (categoryId) params = params.set('category', categoryId);
    if (minPrice !== undefined && minPrice !== null) params = params.set('price_le', minPrice.toString());
    if (maxPrice !== undefined && maxPrice !== null) params = params.set('price_ge', maxPrice.toString());

    params = params.set('page', page);
    params = params.set('size', size);

    return this.http.get<PagedResponse<Product>>(this.url, { params });
  }

  addProduct(product: NewProduct): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewOrder, Order, OrderProduct } from '../models/order.model';
import { PagedResponse } from '../models/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  getOrders(page: number, size: number): Observable<PagedResponse<Order>> {
    return this.http.get<PagedResponse<Order>>(`${this.url}?page=${page}&size=${size}`);
  }

  getOrderProducts(orderId: number): Observable<OrderProduct[]> {
    return this.http.get<OrderProduct[]>(`${this.url}/${orderId}/products`);
  }

  addOrder(order: NewOrder): Observable<NewOrder> {
    return this.http.post<NewOrder>(this.url, order);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
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

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.url, order);
  }
}

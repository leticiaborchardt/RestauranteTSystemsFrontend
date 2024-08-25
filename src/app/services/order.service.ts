import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = 'http://localhost:3000/'; // TODO: add the correct url

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.url, order);
  }
}

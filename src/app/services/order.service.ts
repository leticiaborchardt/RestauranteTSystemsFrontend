import { HttpClient, HttpParams } from '@angular/common/http';
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

  getOrders(page: number, size: number, customerName?: string, address?: string, status?: string, fromTime?: Date, toTime?: Date, sort?: string, sortType?: string): Observable<PagedResponse<Order>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (customerName) params = params.set('customer_name', customerName);
    if (address) params = params.set('address', address);
    if (status) params = params.set('status', status);
    if (fromTime) params = params.set('from_time', new Date(fromTime.getTime() - fromTime.getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 19));
    if (toTime) params = params.set('to_time', new Date(toTime.getTime() - toTime.getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 19));
    if (sort && sortType) params = params.set('sort', `${sort},${sortType}`);
    
    return this.http.get<PagedResponse<Order>>(this.url, { params });
  }

  getOrderProducts(orderId: number): Observable<OrderProduct[]> {
    return this.http.get<OrderProduct[]>(`${this.url}/${orderId}/products`);
  }

  addOrder(order: NewOrder): Observable<NewOrder> {
    return this.http.post<NewOrder>(this.url, order);
  }
}

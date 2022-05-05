import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Store } from '@ngxs/store';
import { ProductState } from './store/product.state';
import { LoadState } from './store/product.action';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartProducts: any[] = [];

  constructor(private http: HttpClient, private store: Store) { }

  create(order) {
    return this.http.post(`${environment.fbDbUrl}/orders.json`, order)
      .pipe(map((res: any) => {
        return {
          ...order,
          date: new Date(order.date)
        }
      }))
  }

  init() {
    this.loadFromStorage()
    this.store.select(ProductState.getProduct).subscribe((state: any) => {
      localStorage.setItem('cart', JSON.stringify(state))
    })
  }

  loadFromStorage() {
    const storage = localStorage.getItem('cart');

    if (storage) {
      this.store.dispatch(new LoadState(JSON.parse(storage)))
    }
  }
}

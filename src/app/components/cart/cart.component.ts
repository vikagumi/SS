import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product.service';
import { ProductState } from 'src/app/store/product.state';
import { Observable } from 'rxjs';
import { AddProduct, Remove, RemoveAll, RemoveOne } from 'src/app/store/product.action';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Select(ProductState.getProduct)
  product$: Observable<any>

  @Select(ProductState.getTotalPrice)
  totalPrice$: Observable<any>

  cartProducts: Product[] = []
  totalPrice = 0
  form: FormGroup
  submitted = false
  done: boolean = false

  constructor(
    private productServ: ProductService, private store: Store
  ) { }

  ngOnInit() {
    this.totalPrice$.subscribe(sum => {
      this.totalPrice = sum
    });

    this.product$.subscribe((state) => {
      this.cartProducts = state
    });

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const order = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      phone: this.form.value.phone,
      address: this.form.value.address,
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date(),
    }

    this.productServ.create(order).subscribe(res => {
      this.form.reset();
      localStorage.clear();
      this.store.dispatch(new RemoveAll());
      this.submitted = true;

    })

  }


  plus(product) {
    this.store.dispatch(new AddProduct(product));
  }

  minus(product) {
    if (product.number === 1) {
      this.store.dispatch(new Remove(product));
    } else {
      this.store.dispatch(new RemoveOne(product));
    }

  }

  removeItem(product) {
    this.store.dispatch(new Remove(product));
  }
}

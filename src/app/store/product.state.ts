import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Product } from '../models/product.model';
import { ProductService } from '../product.service';
import * as ProductActions from './product.action';

export class ProductStateModel {
  product: Product[]
}

@State<ProductStateModel>({
  name: 'ProductState',
  defaults: {
    product: []
  }
})

@Injectable()

export class ProductState {
  constructor(
    private prodServ: ProductService,
    private store: Store
  ) { }

  @Selector()
  static getProduct(state: ProductStateModel) {
    return state.product
  }

  @Selector()
  static getTotalPrice(state: ProductStateModel) {
    let sum = 0;
    state.product.map((item) => {
      sum += item.price
    })
    return sum
  }


  @Action(ProductActions.AddProduct)
  AddProduct(
    { getState, patchState }: StateContext<ProductStateModel>, { payload }: ProductActions.AddProduct
  ) {
    const state = getState();
    let copy = [...state.product];
    if (copy.includes(payload)) {
      const idx = state.product.indexOf(payload);
      const updated = { ...payload };
      updated.price += updated.price / updated.number;
      updated.number += 1;
      copy[idx] = updated;
    } else {
      copy = [...state.product, payload];
    }


    patchState({
      product: [...copy]
    })
  };

  @Action(ProductActions.LoadState)
  LoadState(
    { getState, patchState }: StateContext<ProductStateModel>, { payload }: ProductActions.LoadState
  ) {
    const state = getState();

    patchState({
      product: [...state.product, ...payload]
    })
  };

  @Action(ProductActions.Remove)
  RemoveProduct(
    { getState, patchState }: StateContext<ProductStateModel>, { payload }: ProductActions.Remove
  ) {

    patchState({
      product: getState().product.filter(a => a.articule !== payload.articule)
    })
  };

  @Action(ProductActions.RemoveOne)
  RemoveOne(
    { getState, patchState }: StateContext<ProductStateModel>, { payload }: ProductActions.RemoveOne
  ) {
    const state = getState();
    let copy = [...state.product];
    const idx = state.product.indexOf(payload);
    const updated = { ...payload };
    updated.price -= updated.price / updated.number;
    updated.number -= 1;
    copy[idx] = updated;

    patchState({
      product: [...copy]
    })
  };

  @Action(ProductActions.RemoveAll)
  RemoveAll({patchState} : StateContext<ProductStateModel>){

    patchState({
      product: []
    })
  }
}
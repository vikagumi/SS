export class AddProduct {
  static readonly type = '[Product] Add product';
  constructor(public payload: any) { }
};
export class RemoveOne {
  static readonly type = '[Product] Remove One product';
  constructor(public payload: any) { }
};
export class Remove {
  static readonly type = '[Product] Remove product';
  constructor(public payload: any) { }
};
export class LoadState {
  static readonly type = '[Product] Load State';
  constructor(public payload: any) { }
};
export class RemoveAll{
  static readonly type = '[Product] Remove All Products'
};
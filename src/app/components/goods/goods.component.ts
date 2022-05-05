import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Store } from '@ngxs/store';
import { AddProduct } from 'src/app/store/product.action';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {

  goods:Product[] = [
  {articule: "1" ,name: "T-shirt with a print", price: 109, img: "https://www.sinsay.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/8/5/8530I-99X-001-1_1.jpg", number: 1},
  {articule: "2" ,name: "Basic T-shirt", price: 159, img: "https://www.sinsay.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/0/3/0321J-99X-001-1_3.jpg", number: 1},
  {articule: "3" ,name: "Longsleeve with print", price: 159, img: "https://www.sinsay.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/5/5/5505J-99X-001-1_1.jpg", number: 1},
  {articule: "4" ,name: "T-shirt with a print", price: 199, img: "https://www.sinsay.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/5/5/5502J-00X-001-1.jpg", number: 1},
  {articule: "5" ,name: "T-shirt with a print", price: 159, img: "https://www.sinsay.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/5/5/5510J-08X-001-1_1.jpg", number: 1},
  {articule: "6" ,name: "T-shirt with a print", price: 159, img: "https://www.sinsay.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/5/4/5497J-53X-001-1.jpg", number: 1}
  ]
  constructor(private productService: ProductService , private store: Store) { }

  ngOnInit(): void {
  }

  addProduct(item: Product){
    this.store.dispatch(new AddProduct(item))
  }

}

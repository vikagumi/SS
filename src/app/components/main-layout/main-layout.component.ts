import { Component, OnChanges, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { ProductState } from 'src/app/store/product.state';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  @Select(ProductState.getTotalPrice)
  totalPrice$: Observable<any>

  totalPrice: number = 0;

  constructor(private prodServ: ProductService) { }

  ngOnInit(){
    this.totalPrice$.subscribe(sum => {
      this.totalPrice = sum
    } )
    this.prodServ.init()
  }

}

import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './../product/product.component';
import { Product } from './../../Model/product';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, ProductComponent],
})
export class HomeComponent {
  @Input() searchTerm = '';

  productList: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.productList = this.productService.GetFeaturedProducts();
  }

  ngOnInit() {
    console.log('Home init: ', this.productService.GetFeaturedProducts());
  }
}

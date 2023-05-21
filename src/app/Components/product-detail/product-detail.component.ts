import { AddItemBtnComponent } from './../Buttons/add-item-btn/add-item-btn.component';
import { Product } from './../../Model/product';
import { ProductService } from '../../Services/product.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,AddItemBtnComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  Product!: Product | undefined;
  // Product!: Observable<Product>

  // Type-script feature - constructor args with access modifiers
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private router: Router
  ) {
    // The assignment happens before the first statement of the constructor body
  }
  /* The above code is equivalent to this Javascript code

    let route, productionService, location
    constructor(route, productService, location) {
      this.route = route;
      this.productService = productService;
      this.location = location;
    }
  */

  ngOnInit(): void {
    // this.Product$ = this.getProduct()
    this.Product = this.getProduct();
    if (!this.Product) this.router.navigateByUrl('/not-found', {skipLocationChange: true})
  }

  getProduct() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    return this.productService.GetProductById(id)
  }
  
  // getProduct(): Product | undefined{
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   return this.productService.GetProductById(id).subscribe();
  // }

  goBack(): void {
    this.location.back();
  }
}

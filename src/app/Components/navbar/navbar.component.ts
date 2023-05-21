import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/Services/product.service';
import { CartService } from 'src/app/Services/cart.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/Model/product';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AppRoutingModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  title = 'Angular Demo';
  cartItemsCount!: BehaviorSubject<number>;
  cartItems$!: Observable<Product[]>;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.cartItemsCount = this.cartService.GetCartItemsCount();
    this.cartItems$ = this.cartService.GetCart();
  }

  search(text: string) {
    this.productService.SearchProducts(text);
  }

  decreaseCartItem(product: Product) {
    this.cartService.DecreaseQty(product);
  }

  increaseCartItem(product: Product) {
    this.cartService.AddProduct(product);
  }

  removeCartItem(product: Product) {
    this.cartService.RemoveCartItem(product);
  }
}

import { CommonModule } from '@angular/common';
import { CartService } from './../../Services/cart.service';
import { Product } from './../../Model/product';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule],
})
export class CartComponent {
  cartItems$!: Observable<Product[]>;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.GetCart();
  }

  goShopping(): void {
    this.router.navigateByUrl('/');
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

  getTotal() {
    return this.cartService.CalculateTotal();
  }
}

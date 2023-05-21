import { Product } from './../Model/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  Cart$: BehaviorSubject<Product[]>;
  CartItemsCount = new BehaviorSubject(0);

  constructor() {
    this.Cart$ = new BehaviorSubject<Product[]>([]);
  }

  GetCart(): Observable<Product[]> {
    return this.Cart$.asObservable();
  }

  GetCartItemsCount(): BehaviorSubject<number> {
    return this.CartItemsCount;
  }

  AddProduct(product: Product): void {
    let added = false;
    for (const item of this.Cart$.getValue() as Product[]) {
      if (item.id === product.id) {
        item.qty! += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.qty = 1;
      const cart = this.Cart$.getValue();
      cart.push(product);
      this.Cart$.next(cart);
    }
    this.CartItemsCount.next(this.CartItemsCount.value + 1);
  }

  DecreaseQty(product: Product): void {
    const cart = this.Cart$.getValue();
    for (const [index, item] of cart.entries()) {
      if (item.id === product.id) {
        item.qty! -= 1;
        if (item.qty === 0) {
          cart.splice(index, 1);
          this.Cart$.next(cart);
        }
        break;
      }
    }
    this.CartItemsCount.next(this.CartItemsCount.value - 1);
  }

  RemoveCartItem(product: Product): void {
    const cart = this.Cart$.getValue();
    for (const [index, item] of cart.entries()) {
      if (item.id === product.id) {
        this.CartItemsCount.next(this.CartItemsCount.value - item.qty!);
        cart.splice(index, 1);
        this.Cart$.next(cart);
        break;
      }
    }
  }

  CalculateTotal(): number {
    const cart = this.Cart$.getValue();
    return cart.reduce((i, j) => i + j.price * j.qty!, 0);
  }
}

import { Product } from './../Model/product';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { PRODUCTS } from '../../data/mock-products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  Products$: BehaviorSubject<Product[]>;
  SingleProductsHistory: Product[];

  constructor() {
    this.Products$ = new BehaviorSubject<Product[]>(PRODUCTS);
    this.SingleProductsHistory = [];
  }

  GetProducts(): Observable<any> {
    return this.Products$.asObservable();
  }

  GetProductById(id: number) {
    const cachedData = this.SingleProductsHistory.find((p) => p.id === id);
    if (cachedData) {
      return cachedData;
    } else {
      const product = this.Products$.getValue().find((p) => p.id === id);
      if (product) {
        this.SingleProductsHistory.push(product);
      }
      return product;
    }
  }

  GetFeaturedProducts() {
    return this.Products$.asObservable().pipe(
      map((products) =>
        products.sort((a: Product, b: Product) => b.sold - a.sold).slice(0, 10)
      )
    );
  }

  SearchProducts(searchTerm: string) {
    if (!searchTerm) {
      this.Products$.next(PRODUCTS);
    } else {
      const filteredProducts = this.Products$.getValue().filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log('FILTERED = ', filteredProducts);
      this.Products$.next(filteredProducts);
    }
  }
}

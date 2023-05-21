import { Product } from './../../../Model/product';
import { CartService } from './../../../Services/cart.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-item-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-item-btn.component.html',
  styleUrls: ['./add-item-btn.component.scss']
})
export class AddItemBtnComponent {

  @Input() item!: Product;
  
  constructor (private cartService: CartService) {}
  
  addToCart(): void {
    this.cartService.AddProduct(this.item)
  }
}

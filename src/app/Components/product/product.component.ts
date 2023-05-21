import { AddItemBtnComponent } from './../Buttons/add-item-btn/add-item-btn.component';
import { RouterModule } from '@angular/router';
import { Product } from './../../Model/product';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule, AddItemBtnComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {

  @Input() product!: Product;

  constructor() {}

}

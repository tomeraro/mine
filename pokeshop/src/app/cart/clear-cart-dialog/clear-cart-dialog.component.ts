import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clear-cart-dialog',
  templateUrl: './clear-cart-dialog.component.html',
  styleUrls: ['./clear-cart-dialog.component.scss']
})
export class ClearCartDialogComponent {

  constructor(private cartService: CartService,
              private dialogRef: MatDialogRef<ClearCartDialogComponent>) { }

  public clearCart(): void {
    this.cartService.clearCart();
    this.dialogRef.close();
  }
}

import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-selldialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatIconModule,
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './selldialog.component.html',
  styleUrl: './selldialog.component.css',
})
export class SelldialogComponent implements OnInit {
  totalPrice: number = 0;

  constructor(
    public dialogRef: MatDialogRef<SelldialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(data);
  }

  ngOnInit(): void {}

  increasePrice(quantity: string, price: any) {
    this.totalPrice = 0;
    this.totalPrice += Number(quantity) * Number(price);
  }

  finalSell(quant: string) {
    // console.log(this.totalPrice);
    this.data['sellC'] = Number(quant);
    this.data['sellPrice'] = this.totalPrice;
    this.dialogRef.close(this.data);
  }
}

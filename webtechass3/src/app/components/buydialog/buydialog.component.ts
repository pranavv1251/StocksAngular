import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstService } from '../../services/first.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buydialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatIconModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './buydialog.component.html',
  styleUrl: './buydialog.component.css',
})
export class BuydialogComponent implements OnInit {
  totalPrice: number = 0;
  constructor(
    public dialogRef: MatDialogRef<BuydialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}

  increasePrice(quantity: string, price: any) {
    this.totalPrice = 0;
    this.totalPrice += Number(quantity) * Number(price);
  }
  finalBuy(quant: string) {
    // console.log(this.totalPrice);
    this.data['quant'] = Number(quant);
    this.data['boughtPrice'] = this.totalPrice;
    this.dialogRef.close(this.data);
  }
}

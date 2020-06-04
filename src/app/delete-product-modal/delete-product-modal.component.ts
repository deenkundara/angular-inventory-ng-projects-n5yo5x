import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.css']
})
export class DeleteProductModalComponent implements OnInit {

  @Input() product;
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cancelDelete() {
    this.cancel.emit();
  }

  confirmDelete() {
    this.confirm.emit();
  }

}
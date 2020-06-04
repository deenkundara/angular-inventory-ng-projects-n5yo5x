import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';
import { ClrWizard } from '@clr/angular';
import pick from 'lodash/pick';

import { IProduct } from './../products.service';

export function minDateValidation(date: Date): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = new Date(control.value) < date;
    return forbidden ? {'minDateValidation': {value: control.value}} : null;
  };
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnChanges {
  @ViewChild('productWizard') productWizard: ClrWizard;

  @Input() product: IProduct;
  @Output() finish = new EventEmitter();
  productForm: FormGroup;
  deviceType = 'tablet';

  deviceTypes = [{
    name: 'Tablet',
    icon: 'tablet',
  }, {
    name: 'Laptop',
    icon: 'computer'
  }, {
    name: 'Phone',
    icon: 'mobile'
  }, {
    name: 'Monitor',
    icon: 'display'
  }];

  constructor(private fb: FormBuilder) {
    this.productForm = fb.group({
      basic: fb.group({
        name: ['', Validators.required],
        description: '',
        active: false,
        features: fb.array([
          fb.control('')
        ])
      }),
      expiration: fb.group({
        expirationDate: [null, Validators.compose([Validators.required, minDateValidation(new Date())])],
      })
    });
  }

  ngOnInit() {
    if (this.product) {
      this.productForm.setValue({
        basic: {
          ...pick(this.product, ['name', 'description', 'active']),
          features: this.product.features || [''],
        },
        expiration: {
          ...pick(this.product, ['expirationDate']),
        }
      });
      this.deviceType = this.product.type;
    }
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  get isBasicInvalid(): boolean {
    return this.productForm.get('basic').invalid;
  }

  get isExpirationInvalid(): boolean {
    return this.productForm.get('expiration').invalid;
  }

  get showNameRequiredError() {
    return this.productForm.get('basic.name').hasError('required') && !this.productForm.get('basic.name').pristine;
  }

  get basicFeatures(): FormArray {
    return <FormArray>this.productForm.get('basic.features');
  }

  selectDevice(device) {
    this.deviceType = device.icon;
  }

  handleClose() {
    this.finish.emit();
    this.close();
  }

  close() {
    this.productForm.reset();
    this.deviceType = 'tablet';
    this.productWizard.goTo(this.productWizard.pageCollection.pages.first.id);
    this.productWizard.reset();
  }

  handleFinish() {
    this.finish.emit({
      product: {
        id: 222111,
        type: this.deviceType,
        ...this.productForm.get('basic').value,
        ...this.productForm.get('expiration').value,
      }
    });
    this.close();
  }

  addFeature() {
    this.basicFeatures.push(this.fb.control(''));
  }

}
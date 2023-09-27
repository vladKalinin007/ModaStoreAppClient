import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(price: number, newPrice: number): string {
    const discount = ((price - newPrice) / price) * 100;
    return discount.toFixed(0) + '%';
  }

}

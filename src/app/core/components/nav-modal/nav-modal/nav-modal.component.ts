import {Component, Input, OnDestroy, OnInit, inject} from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service/category.service';
import { ShopService } from 'src/app/features/shop/shop.service';

@Component({
  selector: 'app-nav-modal',
  templateUrl: './nav-modal.component.html',
  styleUrls: ['./nav-modal.component.scss']
})
export class NavModalComponent  {

  readonly #shopServie = inject(ShopService);
  readonly #categoryService = inject(CategoryService);

  @Input()
  isMenuActive: boolean = true;
  isModalOpen = false; 
  areCategoriesLoaded: boolean = false;
  categoryNames: string[] = [];

  toggleMenu() {
    this.#shopServie.toggleMenuFunction();
  }


  getCategories() {
    this.#categoryService.getCategoriesDirectly().subscribe({
      next: (categories) => {
        this.categoryNames = categories.map(category => category.name);
        this.categoryNames.length > 0 ? this.areCategoriesLoaded = true : this.areCategoriesLoaded = false;
      }
    })
  }
}

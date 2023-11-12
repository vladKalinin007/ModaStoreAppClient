import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, inject, signal} from '@angular/core';
import {IProduct} from "../../core/models/product";
import {ShopService} from "./shop.service";
import {IPagination} from "../../core/models/pagination";
import {IBrand} from "../../core/models/brand";
import {IType} from "../../core/models/productType";
import {ShopParams} from "../../core/models/shopParams";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../core/services/product.service/product.service";
import {fastCascade} from "../../shared/animations/fade-in.animation";
import {ICategory} from "../../core/models/category";
import {CategoryService} from "../../core/services/category.service/category.service";
import {IProductColor} from "../../core/models/catalog/product-color";
import {IProductSize} from "../../core/models/catalog/product-size";
import {IProductAttribute} from "../../core/models/catalog/i-product-attribute";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fastCascade,
  ],
})
export class ShopComponent implements OnInit {

  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  categories: ICategory[];
  categories$: Observable<ICategory[]>;
  colors: IProductColor[];
  sizes: IProductSize[];
  attributes: IProductAttribute;
  materials: string[];
  headerTitle: string;
  shopParams: ShopParams = new ShopParams();
   totalCount: number;
  rangeValues: number[] = [0, 800];
  priceChangeTimeout: number;
  isSideBarHidden: boolean;

  selectedBrand: string | null = null;
  selectedType: string | null = null;
  selectedCategory: string | null = null;
  selectedColor: string | null = null;
  selectedSize: string | null = null;
  selectedMaterial: string | null = null;
  selectedStyle: string | null = null;
  selectedSeason: string | null = null;
  selectedPattern: string | null = null;

  areProductsLoading = signal(true);
  areBrandsLoading = signal(true);
  areTypesLoading = signal(true);
  areCategoriesLoading = signal(true);
  areColorsLoading = signal(true);
  areSizesLoading = signal(true);
  areAttributesLoading = signal(true);

  readonly #shopService: ShopService = inject(ShopService);
  readonly #categoryService: CategoryService = inject(CategoryService);
  readonly #productService: ProductService = inject(ProductService);
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  constructor() { }

  ngOnInit(): void {
    this.setCategory()
    this.loadProducts()
    this.getProducts();
    this.getBrands();
    this.getCategories();
    this.getTypes();
    this.getSizes();
    this.getColors();
    this.getAttributes();
  }

  setCategory(): void {
    this.shopParams.category = this.#activatedRoute.snapshot.paramMap.get('categoryName') ?? '';
  }

  loadProducts() {
    let query: string = this.#activatedRoute.snapshot.paramMap.get('categoryName') ?? '';

    if (query) {
      this.headerTitle = this.#activatedRoute.snapshot.paramMap.get('categoryName');
      this.#productService.getProductsByCategory(query)
    }
    else {
      this.headerTitle = 'All Products';
      this.#productService.getProducts()
    }
  }

  getProducts() {
    this.#shopService.getProducts(this.shopParams)
      .subscribe({
        next: (response: IPagination<IProduct>) => {
          this.products = response.data;
          this.shopParams.pageNumber = response.pageIndex;
          this.shopParams.pageSize = response.pageSize;
          this.totalCount = response.count;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  getBrands() {
    this.#shopService.getBrands()
      .subscribe({
        next: (response: IBrand[]) => {
          this.brands = [
            ...response
          ];
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  getTypes(): void {
    this.#shopService.getTypes(this.shopParams.category)
      .subscribe({
        next: (response: IType[]) => {
          this.types = response;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  getCategories() {
    this.categories$ = this.#categoryService.categories$
    // this.#categoryService.getCategories()
    //   .subscribe({
    //     next: (response: ICategory[]) => {
    //       this.categories = response;
    //       this.updateSideBarVisibility(response);
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     }
    //   });
  }

  private updateSideBarVisibility(categories: ICategory[]): void {
    const currentRoute: string = this.#activatedRoute.snapshot.paramMap.get('categoryName');

    const isCategoryFound = categories.some(category => category.name === currentRoute);

    if (!isCategoryFound) {
      this.isSideBarHidden = true;
    }
  }

  getSizes(): void {
    this.#productService.getSizes().subscribe({
      next: (response: IProductSize[]) => {
        this.sizes = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getColors(): void {
    this.#productService.getColors().subscribe({
      next: (response: IProductColor[]) => {
        this.colors = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getAttributes(): void {
    this.#productService.getAttributes().subscribe({
      next: (response: IProductAttribute) => {
        console.log("attributes", response)
        this.attributes = response;
        console.log("this.attributes", this.attributes)

      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onBrandSelected(brandId: string): void {
    console.log(this.shopParams)
    this.selectedBrand = this.selectedBrand === brandId ? null : brandId;
    this.shopParams.brandId = this.selectedBrand;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }


  onColorSelected(colorId: string): void {
    this.selectedColor = this.selectedColor === colorId ? null : colorId;
    this.shopParams.colorId = this.selectedColor;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSizeSelected(sizeId: string): void {
    this.selectedSize = this.selectedSize === sizeId ? null : sizeId;
    this.shopParams.sizeId = this.selectedSize;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onMaterialSelected(material: string) {
    this.selectedMaterial = this.selectedMaterial === material ? null : material;
    this.shopParams.material = this.selectedMaterial;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSeasonSelected(season: string) {
    this.selectedSeason = this.selectedSeason === season ? null : season;
    this.shopParams.season = this.selectedSeason;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onPatternSelected(pattern: string) {
    this.selectedPattern = this.selectedPattern === pattern ? null : pattern;
    this.shopParams.pattern = this.selectedPattern;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onStyleSelected(style: string) {
    this.selectedStyle = this.selectedStyle === style ? null : style;
    this.shopParams.style = this.selectedStyle;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onPriceSelected(): void {
    if (this.priceChangeTimeout) {
      clearTimeout(this.priceChangeTimeout);
    }

    // this.priceChangeTimeout = setTimeout(() => {
    //   this.shopParams.minPrice = this.rangeValues[0].toString();
    //   this.shopParams.maxPrice = this.rangeValues[1].toString();
    //   this.shopParams.pageNumber = 1;
    //   this.getProducts();
    // }, 2000);
  }


  onTypeSelected(typeId: string) {
    this.selectedType = this.selectedType === typeId ? null : typeId;
    this.shopParams.typeId = this.selectedType;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}

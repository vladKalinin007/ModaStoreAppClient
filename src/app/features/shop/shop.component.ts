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
import {IProductColor} from "../../core/models/catalog/product-color.interface";
import {IProductSize} from "../../core/models/catalog/product-size.interface";
import {IProductAttribute} from "../../core/models/catalog/product-attribute.interface";
import { Observable, map, of, startWith, switchMap } from 'rxjs';

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
  products$: Observable<IProduct[]>;
  brands$: Observable<IBrand[]>;
  types$: Observable<IType[]>;
  categories: ICategory[];
  categories$: Observable<ICategory[]>;
  colors: IProductColor[];
  colors$: Observable<IProductColor[]>;
  sizes: IProductSize[];
  sizes$: Observable<IProductSize[]>;
  attributes: IProductAttribute;
  materials: string[];
  materials$: Observable<string[]>;
  styles$: Observable<string[]>;
  patterns$: Observable<string[]>;
  seasons$: Observable<string[]>;
  headerTitle: string;
  shopParams: ShopParams = new ShopParams();
   totalCount: number;
  rangeValues: number[] = [0, 300];
  priceChangeTimeout: NodeJS.Timeout;
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

  startThumbValue: number = 0;
  endThumbValue: number;

  areProductsLoading$: Observable<boolean>;
  areBrandsLoading$: Observable<boolean>;
  areTypesLoading$: Observable<boolean>;
  areCategoriesLoading$: Observable<boolean>;
  areColorsLoading$: Observable<boolean>;
  areSizesLoading$: Observable<boolean>;
  areAttributesLoading$: Observable<boolean>;

  readonly #shopService: ShopService = inject(ShopService);
  readonly #productService: ProductService = inject(ProductService);
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  constructor() { }

  ngOnInit(): void {
    this.scrollToTop()
    this.setCategory()
    this.loadProducts()
    this.getProducts();
    this.getBrands();
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
    this.products$ = this.#shopService.getProducts(this.shopParams).pipe(
      map((response: IPagination<IProduct>) => {
        this.totalCount = response.count;
        return response.data;
      })
    );
    this.areProductsLoading$ = this.products$.pipe(
      map(products => products && products.length > 0 ? false : true),
      startWith(true)
    );
  }

  getBrands(): void {
    this.brands$ = this.#shopService.brands$;
    this.areBrandsLoading$ = this.brands$.pipe(
      map(brands => brands && brands.length > 0 ? false : true),
      startWith(true)
    );
  }

  getTypes(): void {
    const categoryName: string = this.#activatedRoute.snapshot.paramMap.get('categoryName');
    this.types$ = this.#shopService.getTypes(categoryName);
    this.areTypesLoading$ = this.types$.pipe(
      switchMap(types => of(types && types.length > 0 ? false : true)),
      startWith(true)
    );
  }

  private updateSideBarVisibility(categories: ICategory[]): void {
    const currentRoute: string = this.#activatedRoute.snapshot.paramMap.get('categoryName');

    const isCategoryFound = categories.some(category => category.name === currentRoute);

    if (!isCategoryFound) {
      this.isSideBarHidden = true;
    }
  }

  getSizes(): void {
    const category: string = this.#activatedRoute.snapshot.paramMap.get('categoryName');
    this.sizes$ = this.#shopService.getSizes(category);
    this.areSizesLoading$ = this.sizes$.pipe(
      map(sizes => sizes && sizes.length > 0 ? false : true),
      startWith(true)
    );
  }

  getColors(): void {
    const category: string = this.#activatedRoute.snapshot.paramMap.get('categoryName');
    this.colors$ = this.#shopService.getColors(category);
    this.areColorsLoading$ = this.colors$.pipe(
      map(colors => colors && colors.length > 0 ? false : true),
      startWith(true)
    );
  }

  getAttributes(): void {
    const category: string = this.#activatedRoute.snapshot.paramMap.get('categoryName');
    this.#shopService.getAttributes(category).subscribe(attributes => {
      this.materials$ = of(attributes.materials);
      this.styles$ = of(attributes.styles);
      this.patterns$ = of(attributes.patterns);
      this.seasons$ = of(attributes.seasons);
    });
    this.areAttributesLoading$ = this.materials$.pipe(
      switchMap(materials => of(materials && materials.length > 0 ? false : true)),
      startWith(true)
    );
  }

  onBrandSelected(brandId: string): void {
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

    this.priceChangeTimeout = setTimeout(() => {
      this.shopParams.minPrice = this.startThumbValue.toString();
      this.shopParams.maxPrice = this.endThumbValue.toString();
      this.shopParams.pageNumber = 1;
      this.getProducts();
    }, 1200);
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

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  formatLabel(value: number): string {
    return '$' + value;
  }
}

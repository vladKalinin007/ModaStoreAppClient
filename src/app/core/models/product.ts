import {IProductColor} from "./catalog/product-color";
import {IProductImage} from "./catalog/product-image";
import {IProductReview} from "./catalog/product-review";
import {IProductSize} from "./catalog/product-size";
import {IProductRelated} from "./catalog/product-related";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  oldPrice: number;
  specialPrice: number;
  discountPercentage: number;
  stockQuantity: number;
  displayOrder: number;
  pictureUrl: string;
  productType: string;
  productBrand: string;
  isBestSeller: boolean;
  isNew: boolean;
  category: string;
  color: string;
  /*size: string;*/
  season: string;
  material: string;
  style: string;
  pattern: string;
  occasion: string;
  sleeve: string;
  neckline: string;
  dressLength: string;
  waistline: string;
  silhouette: string;
  decoration: string;
  closureType: string;
  pantClosureType: string;
  pantLength: string;
  pantStyle: string;
  fitType: string;
  colors: IProductColor[];
  /*productImage: IProductImage[];*/
  // pictures: IProductImage[];
  pictures: string[];
  reviews: IProductReview[];
  sizes: IProductSize[];
  relatedProducts: IProduct[];
  isInWishlist: boolean;
}

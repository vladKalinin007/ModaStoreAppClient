import { IProduct } from "src/app/core/models/product";

export const productMock: IProduct = {
    id: 'test',
    name: 'Test Product',
    description: 'This is a test product',
    shortDescription: 'Test product',
    price: 100,
    oldPrice: 120,
    specialPrice: 80,
    discountPercentage: 20,
    stockQuantity: 50,
    quantity: 1,
    displayOrder: 1,
    pictureUrl: 'https://example.com/test-product.jpg',
    productType: 'Test Type',
    productBrand: 'Test Brand',
    isBestSeller: false,
    isNew: true,
    category: 'Test Category',
    color: 'Red',
    season: 'Summer',
    material: 'Cotton',
    style: 'Casual',
    pattern: 'Solid',
    occasion: 'Casual',
    sleeve: 'Short Sleeve',
    neckline: 'Round Neck',
    dressLength: 'Short',
    waistline: 'Natural',
    silhouette: 'A-Line',
    decoration: 'None',
    closureType: 'Zipper',
    pantClosureType: 'Button',
    pantLength: 'Short',
    pantStyle: 'Regular',
    fitType: 'Regular',
    colors: [],
    pictures: ['https://example.com/test-product.jpg'],
    productReviews: [],
    sizes: [],
    relatedProducts: [],
    isInWishlist: false
  };
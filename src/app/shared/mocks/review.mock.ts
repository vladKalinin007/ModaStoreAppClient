import { IProductReview } from "src/app/core/models/catalog/product-review";

export const reviewMock: IProductReview = {
    id: '12345',
    rating: 5,
    comment: 'Great product!',
    userId: 'test',
    productId: '1',
    createdOnUtc: new Date(),
    productName: 'Product 1',
    userName: 'Test User',
    pictureUrl: 'url',
};
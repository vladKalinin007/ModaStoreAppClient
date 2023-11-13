export interface IProductReview {
  id: string;
  rating: number;
  comment: string;
  productId: string;
  productName: string;
  userName: string;
  pictureUrl: string;
  createdOnUtc: Date;
}

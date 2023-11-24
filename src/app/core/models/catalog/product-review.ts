export interface IProductReview {
  id: string;
  rating: number;
  comment: string;
  productId: string;
  userId: string;
  productName: string;
  userName: string;
  pictureUrl: string;
  createdOnUtc: Date;
}

export interface IPublishReview {
  id: string;
  rating: number;
  comment: string;
  productId: string;
  userId: string;
  createdOnUtc: Date;
}

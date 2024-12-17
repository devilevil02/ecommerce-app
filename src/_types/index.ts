type UUID = string;

type Rating = number;

interface IReview {
  id: UUID;
  product_id: UUID;
  title: string;
  rating: Rating;
  body: string;
}

interface IProduct {
  id: UUID;
  name: string;
  price: number;
  discount: number;
  availability: boolean;
  images: string[];
  description: string;
  rating: Rating;
  reviews: IReview[];
  otherDetails: {
    [key: string]: string;
  };
}

interface IProductPreview {
  id: UUID;
  name: string;
  image: string;
  price: number;
  discount: number;
}

interface ICartProduct {
  product_id: UUID;
  image: string;
  name: string;
  quantity: number;
  price: number;
}

interface ICart {
  products: ICartProduct[];
}

export type {
  UUID,
  IReview,
  IProduct,
  ICart,
  ICartProduct,
  IProductPreview,
  Rating,
};

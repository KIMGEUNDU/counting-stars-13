/// <reference types="vite/client" />

interface ContainerTitle {
  title: string;
  onClick?: () => void;
}

interface ProductItem {
  link: string;
  src: string;
  title: string;
  price: string | number;
  date?: string;
  key?: number;
  id?: number;
}

interface ReviewItem {
  link: string;
  productSrc: string;
  productName: string;
  content: string;
  score: number;
  nickName: string;
}

interface DetailProductSelect {
  option1: string;
  option2: string;
  option3: string;
  rest?: string[];
}

interface DetailProductResult {
  name: string;
  option: string;
  quantity: number;
  price: string;
  required: boolean;
  handleClickUp: () => void;
  handleClickDown: () => void;
}

interface QnaReviewData {
  _id?: number;
  title?: string;
  writer: string;
  writerId?: string;
  date?: string | undefined;
  attachFile?: string;
  content?: string;
  tag?: string;
  grade?: number;
  attachFile?: string;
  productId?: number;
  productName?: string;
  productPrice?: number;
  productImg?: string;
  qnaId?: number;
}

interface Data {
  active: boolean;
  createdAt: string;
  descriptImages: string[];
  detailImages: string[];
  extra: object;
  mainImages: string[];
  name: string;
  options: string[];
  price: number;
  seller_id: number;
  shippingFees: number;
  show: boolean;
  updatedAt: string;
  _id: number;
}

interface joinInfo {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: number;
  type: 'user';
  emailAgree: false;
}

interface OrderData {
  image: string;
  name: string;
  price: number;
  quantity: number;
  _id: number;
}

interface UserOrderData {
  address: { name: string; value: string };
  cost: { products: number; shippingFees: number; total: number };
  createdAt: string;
  products: OrderData[];
  user_id: number;
  _id: number;
}

interface ProductData {
  _id: number;
  seller_id: number;
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  name: string;
  options: { [key: string]: string }[];
  mainImages: string[];
  detailImages: string[];
  descriptImages: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  quantity: number;
  buyQuantity: number;
  extra: {
    isNew: boolean;
    isBest: boolean;
    category: string[];
    sort: number;
  };
}

interface optionObject {
  [key: string]: string;
}

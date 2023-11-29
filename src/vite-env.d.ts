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
}

interface QnaReviewTable {
  title: string;
  writer: string;
  content: string;
  date?: string;
  view?: string;
  score?: number;
  writerId?: string;
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
  address: { name: string, value: string; };
  cost: { products: number, shippingFees: number, total: number; };
  createdAt: string;
  products: OrderData[];
  user_id: number;
  _id: number;
}
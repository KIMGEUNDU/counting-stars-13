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
  link: number;
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
  id: number;
  name: string;
  quantity: number;
  price: string;
  required: boolean;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

interface Data {
  active: boolean;
  createdAt: string;
  descriptImages: string[];
  detailImages: string[];
  extra?: {
    depth: number;
    parent: number;
    option: string;
  };
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
  createdAt?: string;
  extra: {
    depth: number;
    option: string;
    parent: number;
  };
}

interface UserOrderData {
  address?: {
    name?: string;
    value?: string;
    address?: string;
    addressDetail?: string;
    zonecode?: string;
  };
  cost?: {
    discount?: { products: number; shippingFees: number };
    products: number;
    shippingFees: number;
    total: number;
  };
  createdAt?: string;
  products?: OrderData[];
  user_id?: number;
  _id?: number;
}

interface ProductData {
  _id: number;
  seller_id: number;
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  name: string;
  options: Item;
  productOptions: { [key: string]: string }[];
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
    option: string;
  };
}

interface Item {
  item: Product[];
}

interface optionObject {
  [key: string]: string;
}

interface address {
  zonecode: string | undefined;
  address: string | undefined;
  addressDetail: string | undefined;
}

interface editMemberInfo {
  email: string;
  name: string;
  phone: string;
  address: address;
  type: string;
  emailAgree: boolean;
  birthday: string;
}

interface CartItem {
  _id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  extra: {
    isNew: boolean;
    isBest: boolean;
    category: string[];
    sort: number;
    option: string;
  };
}

interface Product {
  _id: number;
  price: number;
  name: string;
  image: string;
  quantity: number;
  buyQuantity: number;
  option: string;
  extra: Extra;
  options: string | [];
  productOptions: string | [];
}

interface Extra {
  option: ReactNode;
  parent: number;
}

interface Replies {
  _id?: number;
  type?: string;
  title?: string | undefined;
  content: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
  product_id?: number;
  product?: {
    _id: number;
    name: string;
    image: string;
  };
  writer?: string;
  user_id?: number;
  user?: {
    _id: number;
    name: string;
  };
  replies?: CommentData[];
  extra?: {
    type?: string;
    attachFile?: string;
    title?: string;
    tag?: string;
    boardId?: number;
    user?: {
      _id: number;
      name: string;
    };
    product_name?: string;
    product_image?: string;
    productOption?: string;
  };
}

interface Review {
  title: string;
  _id: number;
  content: string;
  rating: number;
  createdAt: string;
  product_id: number;
  product: {
    _id: number;
    name: string;
    image: string;
  };
  writer?: string;
  user: {
    _id: number;
    name: string;
  };
  extra: {
    type: string;
    attachFile?: string;
    title: string;
    tag?: string;
    boardId?: number;
  };
}

interface OrderItemDetail {
  link: string;
  num?: number;
  img: string;
  option?: string;
  name: string;
  number: number;
  price: number;
  _id?: string;
  quantity?: number;
  state?: string;
  orderState: string;
}

interface CommentInput {
  rating: number;
  product_id: number;
  content: string;
  extra: {
    type: string;
    boardId: number;
  };
}

interface myOrderInfoType {
  _id?: number;
  createdAt: Date;
  state: string;
  products: OrderProduct[];
}

interface CommentData {
  _id: number;
  content: string;
  updatedAt: string;
  createdAt: string;
  user: {
    _id: number;
    name: string;
  };
  extra: {
    boardId: number;
  };
}

interface OrderExtra {
  sort: number;
  parent: number;
  option: string;
}

interface OrderProduct {
  _id: number;
  quantity: number;
  seller_id: number;
  name: string;
  image: string;
  price: number;
  extra: OrderExtra;
  state: string;
}

interface Order {
  _id: number;
  quantity: number;
}

interface Address {
  name: string;
  value: string;
  phone: string;
  message: string;
}

interface payProduct {
  type: string;
  products: Order[];
  address: Address;
}

interface dateThreeMonthRange {
  dateToThreeMonth: Date | undefined;
  dateFromThreeMonth: Date | undefined;
}

interface OrderRes {
  ok: 0 | 1;
  item?: Product;
  message?: string;
}

interface OrderInfo {
  products: OrderProduct[];
  address: {
    name: string;
    value: string;
    phone: string;
    message: string;
  };
  payment: object;
}

interface IamportRes {
  success: boolean;
  error_msg: string;
  [attr: string]: string | boolean;
}

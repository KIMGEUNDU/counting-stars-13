/// <reference types="vite/client" />

interface ContainerTitle {
  title: string;
}

interface ProductItem {
  link: string;
  src: string;
  title: string;
  price: string;
}

interface ReviewItem {
  link: string;
  productSrc: string;
  productName: string;
  content: string;
  score: number;
  nickName: string;
}
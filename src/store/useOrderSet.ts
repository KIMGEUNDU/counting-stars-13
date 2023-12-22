import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';

interface Product {
  _id: number;
  quantity: number;
}

interface Products {
  products: Product[];
}

type OrderSet = {
  order: Products;
  setProduct: (products: Product[]) => void;
  removeProduct: (id: number) => void;
};

export const useOrderSet = create(
  persist<OrderSet>(
    (set) => ({
      order: {
        products: [],
      },
      setProduct: (orderProducts: Product[]) =>
        set(
          produce((draft) => {
            draft.order.products = orderProducts;
          })
        ),
      removeProduct: (id) =>
        set(
          produce((draft) => {
            draft.order.products = draft.order.products.filter(
              (product: Product) => product._id !== id
            );
          })
        ),
    }),
    { name: 'order-storage' }
  )
);

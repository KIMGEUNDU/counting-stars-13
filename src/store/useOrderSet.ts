import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  _id: number;
  quantity: number;
}

interface Products {
  dryRun: boolean;
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
        dryRun: true,
        products: [],
      },
      setProduct: (orderProducts: Product[]) =>
        set((state) => {
          return {
            ...state,
            order: {
              ...state.order,
              products: orderProducts,
            },
          };
        }),
      removeProduct: (id) =>
        set((state) => ({
          ...state,
          order: {
            ...state.order,
            products: state.order.products.filter(
              (product) => product._id !== id
            ),
          },
        })),
    }),
    { name: 'order-storage' }
  )
);

import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import PaginationNumber from '@/components/PaginationNumber';
import ProductItem from '@/components/Shop/ProductItem';
import { axiosBase } from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

const fetchData = (id: string) => {
  if (id === 'all') {
    const response = axiosBase.get(`/products?`, {
      params: {
        extra: JSON.stringify({
          'extra.category.0': `PC-shop`,
        }),
      },
    });
    return response;
  } else {
    const response = axiosBase.get(`/products?`, {
      params: {
        custom: JSON.stringify({
          'extra.category.1': `PC-${id}`,
        }),
      },
    });
    return response;
  }
};

export default function Shop() {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchData(String(id)),
    select: (data) => data.data.item,
    staleTime: 1000 * 2,
    refetchOnWindowFocus: false,
  });
  const [category, setCategory] = useState('');
  const [arrData, setData] = useState<ProductData[]>();
  const [sort, setSort] = useState<string>('basic');

  useEffect(() => {
    switch (id) {
      case 'dessert':
        setCategory('디저트/케이크');
        break;
      case 'special':
        setCategory('자연식/특식');
        break;
      case 'gum':
        setCategory('육포/우육껌');
        break;
      case 'bone':
        setCategory('천연껌/뼈간식');
        break;
      case 'party':
        setCategory('파티용품/굿즈');
        break;
      default:
        setCategory('전체 상품');
    }
    setSort('basic');
    setData(data);
  }, [category, id, isLoading, error, data]);

  const handlePrice = (sort: string) => {
    if (sort === 'basic') {
      setSort(sort);
      setData(data);
    }
    if (sort === 'new') {
      setSort(sort);
      setData(
        data.toSorted((a: ProductData, b: ProductData) =>
          a.updatedAt > b.updatedAt ? 1 : -1
        )
      );
    }
    if (sort === 'name') {
      setSort(sort);
      setData(
        data.toSorted((a: ProductData, b: ProductData) =>
          a.name > b.name ? 1 : -1
        )
      );
    }
    if (sort === 'high') {
      setSort(sort);
      setData(
        data.toSorted((a: ProductData, b: ProductData) => b.price - a.price)
      );
    }
    if (sort === 'low') {
      setSort(sort);
      setData(
        data.toSorted((a: ProductData, b: ProductData) => a.price - b.price)
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>{category} - 별,해달</title>
      </Helmet>
      <PageMap route="Shop" category={category} />
      <PageMainTitle title={category} />
      <div className="center pb-10">
        <p className="py-4 text-gray-600">
          총 <span className="text-lg">{data?.length}</span>개
        </p>
        <ul className="flex gap-7 border-t border-t-gray-400 border-b border-b-gray-300 py-3">
          <li className="text-gray-600 hover:font-bold">
            <button
              type="button"
              onClick={() => handlePrice('basic')}
              className={sort === 'basic' ? 'font-semibold' : ''}
            >
              기본
            </button>
          </li>
          <li className="text-gray-600 hover:font-bold">
            <button
              type="button"
              onClick={() => handlePrice('new')}
              className={sort === 'new' ? 'font-semibold' : ''}
            >
              신상품
            </button>
          </li>
          <li className="text-gray-600 hover:font-bold">
            <button
              type="button"
              onClick={() => handlePrice('name')}
              className={sort === 'name' ? 'font-semibold' : ''}
            >
              상품명
            </button>
          </li>
          <li className="text-gray-600 hover:font-bold">
            <button
              type="button"
              onClick={() => handlePrice('low')}
              className={sort === 'low' ? 'font-semibold' : ''}
            >
              낮은 가격
            </button>
          </li>
          <li className="text-gray-600 hover:font-bold">
            <button
              type="button"
              onClick={() => handlePrice('high')}
              className={sort === 'high' ? 'font-semibold' : ''}
            >
              높은 가격
            </button>
          </li>
        </ul>
        <ul className="flex flex-wrap text-center py-3">
          {arrData &&
            arrData.map((item: ProductData) => {
              return (
                <li key={item._id} className="w-1/4">
                  <ProductItem
                    link={`${item._id}`}
                    src={item.mainImages[0]}
                    title={item.name}
                    price={item.price}
                  />
                </li>
              );
            })}
        </ul>
        <PaginationNumber length={1} />
      </div>
    </>
  );
}

import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import ProductItem from '@/components/Shop/ProductItem';
import { axiosBase } from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

const fetchData = (id: string, pageNum: number, priceSort = 0) => {
  if (id === 'all' && priceSort) {
    const response = axiosBase.get(
      `/products?page=${pageNum}&limit=24&sort={"price": ${priceSort}}`,
      {
        params: {
          extra: JSON.stringify({
            'extra.category.0': `PC-shop`,
          }),
        },
      }
    );
    return response;
  } else if (id === 'all') {
    const response = axiosBase.get(`/products?page=${pageNum}&limit=24`, {
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
  const [pageNum, setPageNum] = useState(1);
  const [totalNum, setTotalNum] = useState(0);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [priceSort, setPriceSort] = useState(0);
  const { isLoading, data, error } = useQuery({
    queryKey: ['products', id, pageNum, priceSort],
    queryFn: () => fetchData(String(id), pageNum, priceSort),
    select: (data) => data.data,
    staleTime: 1000 * 2,
    refetchOnWindowFocus: false,
  });
  const [category, setCategory] = useState('');
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [sort, setSort] = useState<string>('basic');

  useEffect(() => {
    switch (id) {
      case 'dessert':
        setCategory('디저트/케이크');
        setPageNum(1);
        break;
      case 'special':
        setCategory('자연식/특식');
        setPageNum(1);
        break;
      case 'gum':
        setCategory('육포/우육껌');
        setPageNum(1);
        break;
      case 'bone':
        setCategory('천연껌/뼈간식');
        setPageNum(1);
        break;
      case 'party':
        setCategory('파티용품/굿즈');
        setPageNum(1);
        break;
      default:
        setCategory('전체 상품');
    }
    setProductData(data?.item);
    setTotalPageNum(data?.pagination.totalPages);
    setTotalNum(data?.pagination.total);
  }, [category, id, isLoading, error, data]);

  useEffect(() => {
    setSort('basic');
  }, [id]);

  const handleSort = (sort: string) => {
    const resetState = () => {
      setPageNum(1);
      setSort(sort);
    };

    const sortData = (
      compareFn: (a: ProductData, b: ProductData) => number
    ) => {
      setProductData(productData.toSorted(compareFn));
    };

    switch (sort) {
      case 'basic':
        resetState();
        if (id === 'all') {
          setPriceSort(0);
        }
        setProductData(data?.item);
        break;
      case 'new':
        resetState();
        sortData((a: ProductData, b: ProductData) =>
          a.updatedAt > b.updatedAt ? 1 : -1
        );
        break;
      case 'name':
        resetState();
        sortData((a: ProductData, b: ProductData) =>
          a.name > b.name ? 1 : -1
        );
        break;
      case 'high':
        resetState();
        if (id === 'all') {
          setPriceSort(-1);
        }
        sortData((a: ProductData, b: ProductData) => b.price - a.price);
        break;
      case 'low':
        resetState();
        if (id === 'all') {
          setPriceSort(1);
        }
        sortData((a: ProductData, b: ProductData) => a.price - b.price);
        break;
    }
  };

  return (
    <>
      <Helmet>
        <title>{category} - 별,해달</title>
      </Helmet>
      <PageMap route="shop/all" routeName="Shop" category={category} />
      <PageMainTitle title={category} />
      <div className="center pb-10">
        <p className="py-4 text-gray-600">
          총 <span className="text-lg">{totalNum}</span>개
        </p>
        <ul className="flex gap-7 border-t border-t-gray-400 border-b border-b-gray-300 py-3">
          <li className="text-gray-600 hover:font-bold">
            <button
              type="button"
              onClick={() => handleSort('basic')}
              className={sort === 'basic' ? 'font-semibold' : ''}
            >
              기본
            </button>
          </li>
          {category !== '전체 상품' && (
            <>
              <li className="text-gray-600 hover:font-bold">
                <button
                  type="button"
                  onClick={() => handleSort('new')}
                  className={sort === 'new' ? 'font-semibold' : ''}
                >
                  신상품
                </button>
              </li>
              <li className="text-gray-600 hover:font-bold">
                <button
                  type="button"
                  onClick={() => handleSort('name')}
                  className={sort === 'name' ? 'font-semibold' : ''}
                >
                  상품명
                </button>
              </li>
            </>
          )}
          <li className="text-gray-600 hover:font-bold">
            <button
              type="button"
              onClick={() => handleSort('low')}
              className={sort === 'low' ? 'font-semibold' : ''}
            >
              낮은 가격
            </button>
          </li>
          <li className="text-gray-600 hover:font-bold">
            <button
              type="button"
              onClick={() => handleSort('high')}
              className={sort === 'high' ? 'font-semibold' : ''}
            >
              높은 가격
            </button>
          </li>
        </ul>
        <ul className="flex flex-wrap text-center py-3">
          {productData &&
            productData.map((item: ProductData) => {
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
        <div className="flex gap-3 justify-center items-center py-4">
          {Array(totalPageNum)
            .fill('')
            .map((_, i) => (
              <button
                key={i}
                type="button"
                className={`hover:bg-starPink hover:text-white px-2 rounded-sm 
                ${pageNum === i + 1 ? 'bg-starPink text-white' : ''}
            `}
                onClick={() => {
                  if (i + 1 === pageNum) return;
                  window.scrollTo(0, 0);
                  return setPageNum(i + 1);
                }}
              >
                {i + 1}
              </button>
            ))}
        </div>
      </div>
    </>
  );
}

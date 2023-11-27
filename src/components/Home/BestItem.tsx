import banner from '/eventBanner.png';
import { Link } from 'react-router-dom';
import MainTitle from '../MainTitle';
import ProductItem from '../Shop/ProductItem';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

function BestItem() {
  const [category, setCategory] = useState('party');

  const { data } = useQuery({
    queryKey: ['products', category],
    queryFn: () =>
      axios.get(`/products?`, {
        params: {
          extra: JSON.stringify({
            'extra.category.0': `PC-shop`,
            'extra.category.1': `PC-${category}`,
          }),
        },
      }),
    select: (data) => data.data.item,
    staleTime: 1000 * 2,
    refetchOnWindowFocus: false,
  });

  const handleClick = (tag: string) => {
    setCategory(tag);
  };

  return (
    <section className="w-4/5 m-auto text-center pb-20">
      <MainTitle title="Best Item" />

      <article className="flex gap-3 justify-center py-7">
        <button
          type="button"
          onClick={() => handleClick('party')}
          className="filterButton bg-zinc-900 text-white"
        >
          #특별한_날
        </button>
        <button
          type="button"
          onClick={() => handleClick('special')}
          className="filterButton"
        >
          #자연식
        </button>
        <button
          type="button"
          onClick={() => handleClick('gum')}
          className="filterButton"
        >
          #육포
        </button>
        <button
          type="button"
          onClick={() => handleClick('bone')}
          className="filterButton"
        >
          #천연껌
        </button>
      </article>

      <article className="flex gap-1">
        <ul className="flex gap-5 flex-wrap min-w-[500px]">
          {data &&
            data.slice(0, 8).map((item: any) => {
              return (
                <li key={item._id}>
                  <ProductItem
                    link={item._id}
                    src={item.mainImages[0]}
                    title={item.name}
                    price={item.price}
                  />
                </li>
              );
            })}
        </ul>
        <Link to="/join" className="w-3/5 ml-auto">
          <img src={banner} alt="이벤트 배너" className="w-full" />
        </Link>
      </article>
    </section>
  );
}

export default BestItem;

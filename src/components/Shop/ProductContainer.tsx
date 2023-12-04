import MainTitle from '../MainTitle';
import ProductItem from './ProductItem';

function ProductContainer({ data }: { data: ProductData[] }) {
  return (
    <div className="w-4/5 m-auto text-center">
      <MainTitle title="All Arrival" />
      <div>
        <ul className="flex flex-wrap justify-center w-full">
          {data &&
            data.map((item: ProductData) => {
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
      </div>
    </div>
  );
}

export default ProductContainer;

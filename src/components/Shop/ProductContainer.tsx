import MainTitle from '../MainTitle';
import ProductItem from './ProductItem';

function ProductContainer({ data }: { data: any }) {
  return (
    <div className="w-4/5 m-auto text-center">
      <MainTitle title="All Arrival" />
      <div className="flex gap-1">
        <ul className="flex gap-5 flex-wrap justify-center">
          {data &&
            data.map((item: any) => {
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
      </div>
    </div>
  );
}

export default ProductContainer;

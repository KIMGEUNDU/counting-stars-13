import ProductItem from './ProductItem';

function ProductContainer({ title }: ContainerTitle) {
  return (
    <div className="w-[1200px] m-auto text-center">
      <h1 className="font-bold text-2xl">{title}</h1>
      <div className="flex gap-1">
        <ul className="flex gap-2 flex-wrap justify-center">
          {Array(28)
            .fill()
            .map((_, i) => (
              <li key={i}>
                <ProductItem
                  link="#"
                  src="https://ggaggamukja.com/web/product/big/202303/9a0d91db522758c9ba7e3a764acca74e.jpg"
                  title="멍돈까스"
                  price="8,000"
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductContainer;

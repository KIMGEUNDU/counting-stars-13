function ProductItem({ link, src, title, price }: ProductItem) {
  return (
    <a href={link}>
      <figure className="flex flex-col gap-3 justify-center items-center">
        <img src={src} alt={title} className="w-60 h-60" />
        <figcaption className="text-sm">{title}</figcaption>
        <p className="font-semibold">{price}</p>
      </figure>
    </a>
  );
}

export default ProductItem;

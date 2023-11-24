function ProductSelect({ title }: ContainerTitle) {
  return (
    <article className="border border-gray-300 mb-4 flex items-center p-4">
      <img
        src="/noImage.gif"
        alt="상품 기본 이미지"
        className="border-r border-gray-200 pr-4"
      />
      <p className="pl-4 align-middle">
        <button type="button" className="border py-3 w-36">
          {title}
        </button>
      </p>
    </article>
  );
}

export default ProductSelect;

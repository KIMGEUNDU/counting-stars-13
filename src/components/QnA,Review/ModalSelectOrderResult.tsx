function ModalSelectOrderResult({
  src,
  title,
  date,
  price,
}: Pick<ProductItem, 'src' | 'title' | 'date' | 'price'>) {
  return (
    <tr className="border-b border-b-300">
      <td className="h-20 py-2">
        <img src={src} alt={title} className="h-full m-auto" />
      </td>
      <td className="flex flex-col h-20 py-2 justify-center">
        <span>{title}</span>
        <span className="font-semibold text-amber-900">{price}원</span>
      </td>
      <td className="">{date}</td>
      <td className="text-center py-2">
        <button type="button" className="border border-gray-300 px-2">
          선택
        </button>
      </td>
    </tr>
  );
}

export default ModalSelectOrderResult;

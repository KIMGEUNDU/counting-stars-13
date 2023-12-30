import OrderItemDetail from './OrderItemDetail';

export default function OrderItem({
  num,
  orderDate,
  productList,
  orderState,
}: {
  num: number;
  orderDate: string;
  productList: object;
  orderState: string;
}) {
  orderDate = orderDate?.slice(0, 10);

  return (
    <tr className="h-[90px] border-b">
      <td className="bg-gray-50">
        <span className="text-sm">
          {orderDate} <br />
        </span>
      </td>
      <td colSpan={6}>
        {Object.values(productList).map((item, i) => (
          <div key={i} className="flex items-center ">
            <OrderItemDetail
              key={i}
              num={num}
              link={item._id ? item._id : ''}
              option={item.extra?.option}
              img={item.image}
              name={item.name}
              number={item.quantity ? item.quantity : 0}
              price={item.price}
              orderState={orderState}
            />
          </div>
        ))}
      </td>
    </tr>
  );
}

import OrderItemDetail from './OrderItemDetail';

export default function OrderItem({
  num,
  orderDate,
  productList,
}: {
  num: number;
  orderDate: string;
  productList: object;
}) {
  // const { myOrderInfo, setMyOrderInfo } = useMyOrderInfo();

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
          <div key={i} className="flex items-center">
            <OrderItemDetail
              key={i}
              num={num}
              link={item._id ? item._id : ''}
              img={item.image}
              name={item.name}
              number={item.quantity ? item.quantity : 0}
              price={item.price}
              deliveryStateNum={item.state ? item.state : ''}
            />
          </div>
        ))}
      </td>
    </tr>
  );
}

import OrderItemDetail from './OrderItemDetail';

export default function OrderItem({
  orderDate,
  productList,
}: {
  orderDate: string;
  productList: object;
}) {
  // const { myOrderInfo, setMyOrderInfo } = useMyOrderInfo();

  orderDate = orderDate?.slice(0, 10);
  console.log(typeof orderDate);

  return (
    <thead>
      <tr className="h-[90px] border-b">
        <td className="bg-gray-50">
          <span className="text-sm">
            {orderDate} <br />
          </span>
        </td>
        <td className="" colSpan={6}>
          {Object.values(productList).map((item) => (
            <div className="flex items-center">
              <OrderItemDetail
                link={item._id ? item._id : ''}
                img={item.img}
                name={item.name}
                number={item.quantity ? item.quantity : 0}
                price={item.price}
                deliveryStateNum={item.state ? item.state : ''}
              />
            </div>
          ))}
        </td>
      </tr>
    </thead>
  );
}

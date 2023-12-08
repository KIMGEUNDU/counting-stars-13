import OrderItemDetail from './OrderItemDetail';

export default function OrderItem({
  orderDate,
  productList,
}: {
  orderDate: string;
  productList: OrderItemDetail[];
}) {
  // const { myOrderInfo, setMyOrderInfo } = useMyOrderInfo();

  console.log(productList);

  orderDate = orderDate?.slice(0, 10);

  return (
    <thead>
      <tr className="h-[90px] border-b">
        <td className="bg-gray-50">
          <span className="text-sm">
            {orderDate} <br />
          </span>
        </td>
        <td className="" colSpan={6}>
          {productList.map((item) => (
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

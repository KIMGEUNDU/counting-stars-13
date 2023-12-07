import { useMyOrderInfo } from '@/store/useMyOrderInfo';
import OrderItemDetail from './OrderItemDetail';

export default function OrderItem({ orderDate, index }) {
  const { myOrderInfo, setMyOrderInfo } = useMyOrderInfo();

  const orderList = Object.values(myOrderInfo).filter(
    (i: typeof myOrderInfo, ind) => index === ind
  );
  orderDate = orderDate.slice(0, 10);

  return (
    <thead>
      <tr className="h-[110px] border-b">
        <td className="bg-gray-50">
          <span className="text-sm">
            {orderDate} <br />
          </span>
        </td>
        <td className="" colSpan={6}>
          {orderList[0].products.map((item) => (
            <div className="flex items-center">
              <OrderItemDetail
                link={item._id}
                img={item.image}
                name={item.name}
                number={item.quantity}
                price={item.price}
                deliveryStateNum={item.state}
              />
            </div>
          ))}
        </td>
      </tr>
    </thead>
  );
}

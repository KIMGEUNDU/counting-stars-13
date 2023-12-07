import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function OrderItemDetail({
  link,
  img,
  name,
  number,
  price,
  deliveryStateNum,
}: OrderItemDetail) {
  const [isDeliveryState, setDeliveryState] = useState('');

  const deliveryState = deliveryStateNum;
  console.log();

  useEffect(() => {
    setDeliveryState(deliveryStateNum);
  }, []);

  console.log(isDeliveryState);

  useEffect(() => {
    function deliveryState() {
      switch (isDeliveryState) {
        case 'OS010':
          setDeliveryState('주문 완료');
          break;
        case 'OS310':
          setDeliveryState('환불 처리 중');
          break;
      }
    }
    deliveryState();
  }, [isDeliveryState]);
  return (
    <>
      <td className="p-2 w-[13%]">
        <Link to={`/detail/${link}`}>
          <img src={img} className="100%" />
        </Link>
      </td>
      <td className="w-[39%]">
        <span>{name}</span>
      </td>
      <td className="font-medium w-[12%]">{number}</td>
      <td className="pr-3 font-semibold w-[12%]">{price}원</td>
      <td className="w-[12%]">{isDeliveryState}</td>
      <td className="h-[12%] w-[12%]"> - </td>
    </>
  );
}

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

  useEffect(() => {
    setDeliveryState(deliveryStateNum);
  }, []);

  useEffect(() => {
    function deliveryState() {
      switch (deliveryStateNum) {
        case 'OS010':
          setDeliveryState('주문 완료');
          break;
        case 'OS030':
          setDeliveryState('배송 준비중');
          break;
        case 'OS035':
          setDeliveryState('배송중');
          break;
        case 'OS040':
          setDeliveryState('배송 완료');
          break;
        case 'OS110':
          setDeliveryState('반품 요청');
          break;
        case 'OS130':
          setDeliveryState('반품 완료');
          break;
        case 'OS330':
          setDeliveryState('환불 완료');
          break;
        case 'OS310':
          setDeliveryState('환불 요청');
          break;
      }
    }
    deliveryState();
  }, [deliveryStateNum]);

  return (
    <>
      <div className="p-2 w-[11%]">
        <Link to={`/detail/${link}`}>
          <img src={img} className="100%" />
        </Link>
      </div>
      <div className="w-[40.5%]">
        <span>{name}</span>
      </div>
      <div className="font-medium w-[13%]">{number}</div>
      <div className="pr-3 font-semibold w-[12%]">
        {price.toLocaleString()}원
      </div>
      <div className="w-[11%]">{isDeliveryState}</div>
      <div className="h-[12%] w-[11%]"> - </div>
    </>
  );
}

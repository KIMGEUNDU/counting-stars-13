import { useEffect, useState } from 'react';

export function useDeliveryState(orderState: string) {
  const [deliveryState, setDeliveryState] = useState('');

  useEffect(() => {
    function getDeliveryState() {
      switch (orderState) {
        case 'OS010':
          setDeliveryState('주문 완료');
          break;
        case 'OS020':
          setDeliveryState('배송 준비 중');
          break;
        case 'OS035':
          setDeliveryState('배송 중');
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
        default:
          setDeliveryState('');
      }
    }
    getDeliveryState();
  }, [orderState]);

  return deliveryState;
}

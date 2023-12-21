import { useState } from 'react';

export const useCheckboxGroup = (
  items: CartItem[] | OrderProduct[],
  defaultCheckAll: boolean
) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(defaultCheckAll);

  const toggleItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
      setIsAllChecked(false);
    } else {
      setCheckedItems([...checkedItems, id]);
      if (checkedItems.length + 1 === items.length) {
        setIsAllChecked(true);
      }
    }
  };

  const toggleAll = () => {
    if (isAllChecked) {
      setCheckedItems([]);
      setIsAllChecked(false);
    } else {
      setCheckedItems(items.map((item) => item._id));
      setIsAllChecked(true);
    }
  };

  return {
    checkedItems,
    isAllChecked,
    toggleItem,
    toggleAll,
    setCheckedItems,
    setIsAllChecked,
  };
};

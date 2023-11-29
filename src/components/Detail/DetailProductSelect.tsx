import { useState, useEffect } from 'react';

function DetailProductSelect({
  data,
  option,
  quantity,
  handleClickUp,
  handleClickDown,
}: {
  data: any;
  option: any;
  quantity: number;
  handleClickUp: () => void;
  handleClickDown: () => void;
}) {
  const [num, setNum] = useState([] as number[]);
  const [selectOption, setSelectOption] = useState([] as string[]);

  useEffect(() => {
    setNum(Array(option.length).fill(1));
    console.log(num);
  }, [option]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectOption.includes(e.target.value)) return;

    setSelectOption(selectOption.concat(e.target.value));
  };

  return (
    <>
      <fieldset className="py-5 flex">
        <label htmlFor="selectOption" className="w-32">
          옵션 선택
        </label>
        <select
          name="selectOption"
          id="selectOption"
          onChange={handleSelect}
          className="border border-gray-300 grow p-1"
        >
          <option value="">[필수] 옵션을 선택해 주세요</option>
          <option value="" disabled>
            ---
          </option>

          {option[0] instanceof Object && (
            <optgroup label={Object.keys(option[0])[0]}>
              {option.map((item: any, index: number) => (
                <option key={index} value={item[Object.keys(option[0])[0]]}>
                  {item[Object.keys(option[0])[0]]}
                </option>
              ))}
            </optgroup>
          )}

          {!(option[0] instanceof Object) &&
            option.map((item: any, index: number) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
      </fieldset>
      {selectOption.length > 0 &&
        selectOption.map((item, index) => (
          <fieldset
            key={index}
            className="border-b border-t border-t-gray-500 border-b-gray-500 py-3 flex justify-between items-center"
          >
            <div>
              <p className="text-sm">{data?.name}</p>
              <span className="text-xs">{item}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex border-2 h-9 rounded-lg justify-around mb-2">
                <input
                  type="text"
                  className="w-9 pl-1"
                  value={num[index]}
                  readOnly
                />
                <div className="flex flex-col gap-2 justify-center">
                  <button type="button" onClick={handleClickUp}>
                    <img src="/cartArrowUp.png" className="w-3" />
                  </button>
                  <button type="button" onClick={handleClickDown}>
                    <img src="/cartArrowDown.png" className="w-3" />
                  </button>
                </div>
              </div>
              {data?.options.length > 0 && (
                <button type="button">
                  <img src="/cancel.png" alt="옵션 닫기" className="w-4" />
                </button>
              )}
            </div>
            <span className="text-sm">{data.price.toLocaleString()} 원</span>
          </fieldset>
        ))}
      <p className="py-6 border-b border-b-gray-300">
        <span className="font-bold">총 상품 금액</span>&#40;수량&#41; :
        <span className="font-bold text-2xl pl-2">
          {(+data?.price * quantity).toLocaleString()} 원
        </span>
        &#40;{quantity}개&#41;
      </p>
    </>
  );
}

export default DetailProductSelect;

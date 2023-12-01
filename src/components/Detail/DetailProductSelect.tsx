import { useState, useEffect } from 'react';

function DetailProductSelect({
  data,
  option,
}: {
  data: ProductData;
  option: { [key: string]: string }[] | string[];
}) {
  const [info] = useState<{ [key: string]: number }>({});
  const [count, setCount] = useState<{ [key: string]: number }>({});
  const [selectOption, setSelectOption] = useState<string[]>([]);
  useEffect(() => {
    option.map((item: string | optionObject) => {
      if (typeof item === 'string') {
        info[item] = data.price;
        count[item] = 0;
      }
      if (item instanceof Object) {
        const optionName = Object.values(item)[0] as string;
        if (!optionName.includes('+') && !optionName.includes('-')) {
          info[optionName] = data.price;
          count[optionName] = 0;
          return;
        }

        if (optionName.includes('-')) {
          const price = +optionName.split('-')[1].replace(/[^0-9]/g, '');
          info[optionName] = data.price - price;
          count[optionName] = 0;
          return;
        }

        if (optionName.includes('+')) {
          const price = +optionName.split('+')[1].replace(/[^0-9]/g, '');
          info[optionName] = price + data.price;
          count[optionName] = 0;
        }
      }
    });
  }, [option, data.price, info]);

  const handleClickUp = (item: string) => {
    if (count[item] > 98) return;
    setCount((prevCount) => ({ ...prevCount, [item]: prevCount[item] + 1 }));
  };

  const handleClickDown = (item: string) => {
    if (count[item] < 2) return;
    setCount((prevCount) => ({ ...prevCount, [item]: prevCount[item] - 1 }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectOption.includes(e.target.value) || e.target.value === '') return;
    setSelectOption(selectOption.concat(e.target.value));
  };

  return (
    <>
      <fieldset className="py-5 flex border-b border-gray-300">
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
              {(option as { [key: string]: string }[]).map((item, index) => {
                const key = Object.keys(item)[0];
                return (
                  <option key={index} value={item[key]}>
                    {item[key]}
                  </option>
                );
              })}
            </optgroup>
          )}

          {typeof option[0] === 'string' &&
            (option as string[]).map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
      </fieldset>
      {selectOption.length > 0 &&
        selectOption.map((item: string, index) => (
          <fieldset
            key={index}
            className="border-b border-b-gray-200 py-3 flex justify-between items-center"
          >
            <div className="min-w-[50%]">
              <p className="text-sm">{data?.name}</p>
              <span className="text-xs">{item}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex border-2 h-9 rounded-lg justify-around mb-2">
                <input
                  type="text"
                  className="w-9 pl-1"
                  value={count[item]}
                  readOnly
                />
                <div className="flex flex-col gap-2 justify-center">
                  <button type="button" onClick={() => handleClickUp(item)}>
                    <img src="/cartArrowUp.png" className="w-3" />
                  </button>
                  <button type="button" onClick={() => handleClickDown(item)}>
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
            {!item.includes('+') && !item.includes('-') && (
              <span className="text-sm">{data.price.toLocaleString()} 원</span>
            )}
            {(item.includes('+') || item.includes('-')) && (
              <span className="text-sm">{info[item].toLocaleString()} 원</span>
            )}
          </fieldset>
        ))}
      <p className="py-6 border-b border-b-gray-300">
        <span className="font-bold">총 상품 금액</span>&#40;수량&#41; :
        <span className="font-bold text-2xl pl-2">
          {Object.entries(count)
            .reduce((acc, cur) => {
              return acc + cur[1] * info[cur[0]];
            }, 0)
            .toLocaleString()}
          원
        </span>
        &#40;
        {Object.entries(count)
          .reduce((acc, cur) => {
            return acc + cur[1];
          }, 0)
          .toLocaleString()}
        개&#41;
      </p>
    </>
  );
}

export default DetailProductSelect;

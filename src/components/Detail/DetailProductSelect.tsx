import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { putWish } from '@/utils/HandleWish';
import { useOrderSet } from '@/store/useOrderSet';
import { useNavigate } from 'react-router-dom';
import { putOptionCart } from '@/utils/HandleCart';

function DetailProductSelect({
  id,
  name,
  price,
  optionSelect,
  optionInfo,
}: {
  id: number;
  name: string;
  price: number;
  optionSelect: { [key: string]: string }[] | string[];
  optionInfo: Product[];
}) {
  const navigate = useNavigate();
  const { setProduct } = useOrderSet();
  const [info] = useState<{ [key: string]: number }>({});
  const [optionId] = useState<{ [key: string]: number }>({});
  const [count, setCount] = useState<{ [key: string]: number }>({});
  const [selectOption, setSelectOption] = useState<string[]>([]);

  useEffect(() => {
    const processOptionData = async () => {
      try {
        optionInfo.map((item: Product) => {
          info[item.extra.option] = item.price;
          optionId[item.extra.option] = item._id;
          count[item.extra.option] = 0;
        });
      } catch (error) {
        toast.error(`${error}가 발생했습니다. 잠시 후 시도해주세요.`);
      }
    };

    processOptionData();
  }, [optionId, id, info]);

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
    if (count[e.target.value] === 0) {
      setCount((prevCount) => ({ ...prevCount, [e.target.value]: 1 }));
    }
    setSelectOption(selectOption.concat(e.target.value));
  };

  const optionDelete = (item: string) => {
    setSelectOption(selectOption.filter((opt) => opt !== item));
    setCount((prevCount) => ({ ...prevCount, [item]: 0 }));
  };

  const handleOrderOption = () => {
    const orderProduct = selectOption.map((item) => ({
      _id: optionId[item],
      quantity: count[item],
    }));
    setProduct(orderProduct);
    navigate('/order');
  };

  return (
    <>
      <Helmet>
        <title>{name} - 별,해달</title>
      </Helmet>
      <fieldset className="py-5 flex border-b border-gray-300">
        <label htmlFor="selectOption" className="w-32">
          옵션 선택
        </label>
        <select
          name="selectOption"
          id="selectOption"
          onChange={handleSelect}
          value={''}
          className="border border-gray-300 grow p-1"
        >
          <option value="">[필수] 옵션을 선택해 주세요</option>
          <option value="" disabled>
            ---
          </option>

          {optionSelect[0] instanceof Object && (
            <optgroup label={Object.keys(optionSelect[0])[0]}>
              {(optionSelect as { [key: string]: string }[]).map(
                (item, index) => {
                  const key = Object.keys(item)[0];
                  return (
                    <option key={index} value={item[key]}>
                      {item[key]}
                    </option>
                  );
                }
              )}
            </optgroup>
          )}

          {typeof optionSelect[0] === 'string' &&
            (optionSelect as string[]).map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
      </fieldset>
      {selectOption.length > 0 &&
        selectOption.map((item: string, index) => (
          <fieldset key={index} className="optionFieldset">
            <div className="min-w-[50%]">
              <p className="text-sm">{name}</p>
              <span className="text-sm font-semibold">{item}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex border-2 h-9 rounded-lg justify-around mb-2">
                <input
                  type="text"
                  className="w-9 pl-1"
                  value={count[item]}
                  // onChange={(e) => handleInputChange(e, item)}
                  readOnly
                />
                <div className="flex flex-col gap-2 justify-center">
                  <button
                    type="button"
                    onClick={() => handleClickUp(item)}
                    className="hover:scale-150 transition-transform"
                  >
                    <img src="/cartArrowUp.png" className="w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleClickDown(item)}
                    className="hover:scale-150 transition-transform"
                  >
                    <img src="/cartArrowDown.png" className="w-3" />
                  </button>
                </div>
              </div>
              {optionSelect.length > 0 && (
                <button type="button" onClick={() => optionDelete(item)}>
                  <img
                    src="/cancel.png"
                    alt="옵션 닫기"
                    className="w-4 hover:scale-125 transition-transform"
                  />
                </button>
              )}
            </div>
            {!item.includes('+') && !item.includes('-') && (
              <span className="text-sm">{price.toLocaleString()} 원</span>
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

      <section className={`flex gap-4 justify-between py-5 mb-10`}>
        <button
          type="button"
          className="detailButton"
          onClick={() => putOptionCart(selectOption, optionId, count)}
        >
          장바구니 담기
        </button>

        <button
          type="button"
          className="detailButton"
          onClick={() => putWish(id)}
        >
          찜하기
        </button>

        <button
          type="button"
          className="detailButton bg-starBlack text-white"
          onClick={handleOrderOption}
        >
          바로 구매하기
        </button>
      </section>
    </>
  );
}

export default DetailProductSelect;

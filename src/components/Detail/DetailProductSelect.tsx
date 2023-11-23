function DetailProductSelect({
  option1,
  option2,
  option3,
  rest,
}: DetailProductSelect) {
  return (
    <fieldset className="py-5 flex">
      <label htmlFor="selectOption" className="w-[130px]">
        필수 선택
      </label>
      <select
        name="selectOption"
        id="selectOption"
        className="border-[1px] border-gray-300 grow p-1"
      >
        <option value="" selected disabled>
          -[필수] 옵션을 선택해 주세요 -
        </option>
        <option value="" disabled>
          -------------
        </option>
        <option value={option1}>{option1}</option>
        <option value={option2}>{option2}</option>
        <option value={option3}>{option3}</option>
        {rest && <option value={rest}>{rest}</option>}
      </select>
    </fieldset>
  );
}

export default DetailProductSelect;

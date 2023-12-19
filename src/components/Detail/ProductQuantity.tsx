function ProductQuantity({
  value,
  handleClickUp,
  handleClickDown,
  setQuantity,
}: {
  value: number;
  handleClickUp: () => void;
  handleClickDown: () => void;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === '') {
      setQuantity(0);
    } else {
      let finalValue = Number(inputValue);

      if (finalValue < 1) {
        finalValue = 1;
      } else if (finalValue > 99) {
        finalValue = 99;
      }

      setQuantity(finalValue);
    }
  };

  return (
    <div className="flex border-2 h-9 rounded-lg justify-around mb-2">
      <input
        type="text"
        className="w-9 pl-1"
        value={value}
        onChange={(e) => handleInputChange(e)}
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
  );
}

export default ProductQuantity;

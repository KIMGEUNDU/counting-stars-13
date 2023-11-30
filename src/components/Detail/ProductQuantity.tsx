function ProductQuantity({
  value,
  handleClickUp,
  handleClickDown,
}: {
  value: number;
  handleClickUp: () => void;
  handleClickDown: () => void;
}) {
  return (
    <div className="flex border-2 h-9 rounded-lg justify-around mb-2">
      <input type="text" className="w-9 pl-1" value={value} readOnly />
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

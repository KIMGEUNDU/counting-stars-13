interface DetailButton {
  btn1: string;
  btn2?: string;
  btn3: string;
  onClick1: () => void;
  onClick2?: () => void;
  onClick3: () => void;
  style: string;
  center?: string;
}

function DetailButton({
  btn1,
  btn2,
  btn3,
  onClick1,
  onClick2,
  onClick3,
  style,
  center,
}: DetailButton) {
  return (
    <div className={`${center} flex gap-4 justify-between py-5 mb-10`}>
      <button type="button" className={style} onClick={onClick1}>
        {btn1}
      </button>
      {btn2 && (
        <button type="button" className={style} onClick={onClick2}>
          {btn2}
        </button>
      )}
      <button
        type="button"
        className={`${style} bg-starBlack text-white`}
        onClick={onClick3}
      >
        {btn3}
      </button>
    </div>
  );
}

export default DetailButton;

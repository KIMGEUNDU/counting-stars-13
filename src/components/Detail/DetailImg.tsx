import { useState } from 'react';

function DetailImg({
  alt,
  main,
  detail,
}: {
  alt: string;
  main: [];
  detail: [];
}) {
  const [mainImageNum, setMainImageNum] = useState(0);

  const changeMain = (i: number) => {
    setMainImageNum(i);
  };

  return (
    <section className="flex flex-wrap justify-between w-[45%] max-w-[500px] gap-3 absolute left-0">
      <img
        src={main ? main[mainImageNum] : ''}
        alt={alt}
        className="w-full max-w-[500px]"
      />
      <article className="w-[500px] overflow-y-hidden overflow-x-scroll flex flex-row gap-2">
        {detail?.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={alt}
            className="cursor-pointer max-w-[100px] object-contain"
            onClick={() => changeMain(i)}
          />
        ))}
      </article>
    </section>
  );
}

export default DetailImg;

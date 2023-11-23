function DetailImg({ src, alt }: { src: string; alt: string }) {
  return (
    <section className="flex flex-wrap justify-between w-[45%] gap-3">
      {Array(5)
        .fill('')
        .map((_, i) => (
          <img
            key={i}
            src={src}
            alt={alt}
            className={`${i === 0 ? 'w-full' : 'w-1/5 h-1/5'}`}
          />
        ))}
    </section>
  );
}

export default DetailImg;

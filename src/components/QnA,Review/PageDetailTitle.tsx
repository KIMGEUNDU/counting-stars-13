function PageDetailTitle({ title, explan }: { title: string; explan: string }) {
  return (
    <div className="center flex items-center gap-6 py-5">
      <h2 className="pageDetailTitle font-bold text-2xl relative">{title}</h2>
      <h3 className="text-gray-500 text-sm">{explan}</h3>
    </div>
  );
}

export default PageDetailTitle;

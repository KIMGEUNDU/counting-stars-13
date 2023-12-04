import DetailProductInformationList from './DetailProductInformationList';

function ProductInformation({ imgArray }: { imgArray: string[] }) {
  if (imgArray) {
    return (
      <div className="pt-24" id="infoLink">
        <DetailProductInformationList select={1} />
        {imgArray.map((v, i) => (
          <img
            key={i}
            src={v}
            alt="상품 정보"
            className={`mx-auto ${i === 0 ? 'pt-20' : ''}`}
          />
        ))}
      </div>
    );
  }
}

export default ProductInformation;

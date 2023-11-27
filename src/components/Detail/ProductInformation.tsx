import DetailProductInformationList from './DetailProductInformationList';

function ProductInformation({ imgArray }: { imgArray: string[] }) {
  if (imgArray) {
    return (
      <div className="py-10">
        <DetailProductInformationList select={1} />
        {imgArray.map((v) => (
          <img src={v} alt="상품이름 정보" />
        ))}
      </div>
    );
  }
}

export default ProductInformation;

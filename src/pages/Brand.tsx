import BrandIntroduce from '@/components/Brand/BrandIntroduce';
import Logo from '@/components/Brand/Logo';
import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import Slogan from '@/components/Brand/Slogan';

export default function Brand() {
  return (
    <>
      <PageMap route="brand" />
      <PageMainTitle title="BRAND" />
      <div className="center flex flex-col text-center gap-28 mb-40">
        <Logo width="w-40" />
        <BrandIntroduce title="브랜드 소개" />
        <Slogan fontSize="text-7xl" padding="" />
        <p className="text-xl">
          2023년에 시작된 별해달은
          <br />
          영양학 기반 레시피와 좋은 재료를
          <br />
          기본으로 하여 건강, 맛, 즐거움을 생각하며
          <br />
          별해달만의 트렌디한 수제 건강식을 만드는 브랜드입니다.
          <br />
          <br />
          앞으로도 반려인과 반려동물의 즐거운 시간을 함께하는
          <br />
          브랜드가 되도록 항상 사명감을 다해 만들고
          <br />
          끊임없이 연구 & 개발하는 별해달이 되겠십니다.
          <br />
          <br />
          반려동물 디저트 연구소 ⭐별해달
        </p>
        <BrandIntroduce title="브랜드 로고" />
        <Logo width="w-80" />
        <BrandIntroduce title="브랜드 캐릭터" />
        <div>
          <img className="m-auto w-72" src="/logoChar.png" alt="별해달캐릭터" />
          <p className="text-4xl italic">달이</p>
        </div>
      </div>
    </>
  );
}

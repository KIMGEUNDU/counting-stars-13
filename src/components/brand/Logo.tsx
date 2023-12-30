function Logo({ width }: { width: string }) {
  return (
    <img className={`${width} m-auto`} src="/logoWord.png" alt="별해달로고" />
  );
}

export default Logo;

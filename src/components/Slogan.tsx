function Slogan({
  fontSize = 'text-8xl',
  padding = 'py-28',
}: {
  fontSize?: string;
  padding?: string;
}) {
  return (
    <p className={`text-starPink font-bold text-center ${padding} ${fontSize}`}>
      We Make Pets Fun!
    </p>
  );
}

export default Slogan;

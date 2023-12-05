export default function MiniButton({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  return (
    <button className={`text-sm border-gray-300 rounded-sm ${className}`}>
      {text}
    </button>
  );
}

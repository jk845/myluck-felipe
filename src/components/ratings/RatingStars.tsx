import StarIcon from "../assets/icons/StarIcon";

interface RatingStarsProps {
  count: number;
}

export function RatingStars({ count }: RatingStarsProps) {
  return (
    <div
      className="flex gap-1.5 items-center"
      role="img"
      aria-label={`${count} stars rating`}
    >
      {Array.from({ length: count }, (_, index) => (
        <StarIcon
          key={index}
          className="object-contain shrink-0 self-stretch my-auto aspect-[1.07] w-[15px] text-yellow-400"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

import Image from "next/image";

type BrandMarkProps = {
  className: string;
  size: number;
};

export default function BrandMark({ className, size }: BrandMarkProps) {
  return (
    <Image
      aria-hidden="true"
      alt=""
      className={`brand-mascot ${className}`}
      height={size}
      src="/mosdev-mascot.png"
      width={size}
    />
  );
}

import { useState, type ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  fallback: string;
};

// Tries the primary URL (e.g. Google Drive) and swaps to the local fallback on error.
export function SmartImage({ src, fallback, alt, ...rest }: Props) {
  const [current, setCurrent] = useState(src);
  return (
    <img
      {...rest}
      src={current}
      alt={alt}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
    />
  );
}
import { fetchImg } from "@/lib/files";
import React, { useEffect, useState } from "react";

export default function ImgFile(
  { src, alt, ...props }:
  React.ImgHTMLAttributes<HTMLImageElement> & {alt: string}
) {
  const [base64Src, setBase64Src] = useState<string | undefined>();

  useEffect(() => {
    if (!src)
      return;

    fetchImg(src).then((val) => {
      setBase64Src(val);
    });
  }, [src]);

  return (
    <img alt={alt} src={base64Src} {...props} />
  );
}

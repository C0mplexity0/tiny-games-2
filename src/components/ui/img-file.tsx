import { fetchImg } from "@/lib/files";
import React, { useEffect, useState } from "react";

export default function ImgFile(
  { src, ...props }:
  React.ImgHTMLAttributes<HTMLImageElement>
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
    <img src={base64Src} {...props} />
  );
}

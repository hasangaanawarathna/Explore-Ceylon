"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { withBasePath } from "@/lib/utils";

const DEFAULT_FALLBACK = "/images/hero-sri-lanka.svg";

type ResilientImageProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
  fallbackSrc?: string;
};

export function ResilientImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt,
  ...props
}: ResilientImageProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const failed = failedSource === src;

  const resolvedSource = failed ? fallbackSrc : src;

  return (
    <Image
      {...props}
      src={withBasePath(resolvedSource)}
      alt={failed ? "" : alt}
      onError={() => setFailedSource(src)}
    />
  );
}

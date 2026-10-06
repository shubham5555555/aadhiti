"use client";

import { useLang } from "@/lib/i18n";
import Image from "next/image";

/** The "आधी ती" wordmark with the woman's profile (transparent WebP, 1224×816). */
export default function BrandLogo({ height = 44, className = "", priority = false }: { height?: number; className?: string; priority?: boolean }) {
  const { lang } = useLang();
  return (
    <Image
      src={`/brand/localized/logo-${lang}.webp`}
      alt="आधी ती — AADHI TI"
      width={1224}
      height={816}
      priority={priority}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}

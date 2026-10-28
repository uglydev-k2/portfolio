import { ImageResponse } from "next/og";
import { OgCard, ogSize } from "@/lib/og-image";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.heroLine}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<OgCard />, { ...size });
}

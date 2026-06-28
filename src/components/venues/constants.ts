import type { SxProps, Theme } from "@mui/material";

export function buildMapQueryUrl(
  name: string,
  neighborhood: string,
  city: string,
): string {
  const q = encodeURIComponent(`${name}, ${neighborhood}, ${city}`);
  return `https://www.google.com/maps/search/${q}`;
}

export const dotGridBg = (color = "#DDD92A"): SxProps<Theme> => ({
  position: "absolute",
  inset: 0,
  opacity: 0.12,
  backgroundImage: `radial-gradient(circle, ${color} 1.5px, transparent 1.5px)`,
  backgroundSize: "20px 20px",
});

export const glowChipSx: SxProps<Theme> = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "primary.main",
  boxShadow: "0 0 20px rgba(221, 217, 42, 0.3)",
};

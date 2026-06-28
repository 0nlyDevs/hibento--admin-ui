import { Chip } from "@mui/material";
import type { EventStatus } from "../../types";

const statusConfig: Record<
  EventStatus,
  { label: string; color: "success" | "warning" | "error" | "default" }
> = {
  live: { label: "Live", color: "success" },
  upcoming: { label: "Upcoming", color: "warning" },
  past: { label: "Past", color: "default" },
};

interface StatusBadgeProps {
  status: EventStatus;
  size?: "small" | "medium";
}

export function StatusBadge({ status, size = "small" }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Chip
      label={config.label}
      color={config.color}
      size={size}
      variant="filled"
      sx={{
        fontWeight: 600,
        borderRadius: "6px",
        "& .MuiChip-label": { px: 1 },
      }}
    />
  );
}

interface LiveBadgeProps {
  isLive: boolean;
}

export function LiveBadge({ isLive }: LiveBadgeProps) {
  if (!isLive) return null;

  return (
    <Chip
      label="Live"
      color="error"
      size="small"
      sx={{
        fontWeight: 700,
        borderRadius: "6px",
        animation: "pulse 2s infinite",
        "@keyframes pulse": {
          "0%": { opacity: 1 },
          "50%": { opacity: 0.7 },
          "100%": { opacity: 1 },
        },
      }}
    />
  );
}

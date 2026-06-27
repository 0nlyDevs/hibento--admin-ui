import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface VenueInfoBadgeProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export function VenueInfoBadge({ icon, label, value }: VenueInfoBadgeProps) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{
          fontSize: "0.65rem",
          letterSpacing: 0.8,
          textTransform: "uppercase",
          display: "block",
          mb: 0.5,
          color: "#6B6973",
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {icon}
        <Typography variant="body2" fontWeight={600} color="#FAFDF6">
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

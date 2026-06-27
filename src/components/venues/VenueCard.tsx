import { Box, Typography, Chip } from "@mui/material";
import { Room, Business } from "@mui/icons-material";
import { dotGridBg, glowChipSx } from "./constants";
import type { Venue } from "../../types";

const cardBg = "#2D2A32";
const heroBg = "#1A1820";

interface VenueCardProps {
  venue: Venue;
  onClick?: () => void;
}

export function VenueCard({ venue, onClick }: VenueCardProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        borderRadius: "12px",
        border: "1px solid",
        borderColor: "rgba(255,255,255,0.06)",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        bgcolor: cardBg,
        transition: "all 0.2s ease",
        "&:hover": onClick
          ? {
              borderColor: "primary.main",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }
          : {},
      }}
    >
      <Box
        sx={{
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          bgcolor: heroBg,
          overflow: "hidden",
        }}
      >
        <Box sx={dotGridBg()} />
        <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <Box sx={{ ...glowChipSx, width: 38, height: 38, mx: "auto", mb: 1 }}>
            <Room sx={{ fontSize: 16, color: "#2D2A32" }} />
          </Box>
          <Typography variant="body1" fontWeight={700} color="#FAFDF6">
            {venue.city}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "rgba(250, 253, 246, 0.35)",
              textTransform: "uppercase",
              letterSpacing: 1.2,
              display: "block",
              mt: 0.25,
            }}
          >
            {venue.neighborhood}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: 2, py: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.25 }}>
          <Business sx={{ fontSize: 14, color: "primary.main" }} />
          <Typography variant="subtitle2" fontWeight={600} noWrap color="#FAFDF6">
            {venue.name}
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{ display: "block", mt: 0.75, color: "#A9A7B0" }}
        >
          {venue.neighborhood}, {venue.city}
        </Typography>
        <Box sx={{ mt: 1.5 }}>
          <Chip
            label={`${venue.totalRooms} rooms`}
            size="small"
            variant="outlined"
            sx={{
              fontWeight: 600,
              fontSize: "0.6rem",
              letterSpacing: 0.5,
              textTransform: "uppercase",
              borderStyle: "dashed",
              borderColor: "rgba(255,255,255,0.15)",
              color: "#A9A7B0",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

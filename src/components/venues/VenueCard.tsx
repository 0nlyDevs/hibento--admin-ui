import { Box, Typography, Chip, Card } from "@mui/material";
import { Room, Business } from "@mui/icons-material";
import { dotGridBg, glowChipSx } from "./constants";
import type { Venue } from "../../types";

const heroBg = "secondary.dark";

interface VenueCardProps {
  venue: Venue;
  onClick?: () => void;
}

export function VenueCard({ venue, onClick }: VenueCardProps) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: onClick ? "pointer" : "default",
        background: "rgba(255, 255, 255, 0.05)",
        overflow: "hidden",
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
            <Room sx={{ fontSize: 16, color: "secondary.main" }} />
          </Box>
          <Typography variant="body1" fontWeight={700} color="text.primary">
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
          <Typography
            variant="subtitle2"
            fontWeight={600}
            noWrap
            color="text.primary"
          >
            {venue.name}
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{ display: "block", mt: 0.75, color: "text.secondary" }}
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
              color: "text.secondary",
            }}
          />
        </Box>
      </Box>
    </Card>
  );
}

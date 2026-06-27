import { Box, Typography, Chip } from "@mui/material";
import { Room, Business, Language } from "@mui/icons-material";
import { dotGridBg, glowChipSx } from "./constants";
import type { Venue } from "../../types";

const cardBg = "#2D2A32";
const heroBg = "#1A1820";

interface VenueHeroProps {
  venue: Venue;
  mapUrl?: string;
}

export function VenueHero({ venue, mapUrl }: VenueHeroProps) {
  return (
    <Box
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "rgba(255,255,255,0.06)",
        mb: 3,
      }}
    >
      <Box
        sx={{
          height: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          bgcolor: heroBg,
          overflow: "hidden",
        }}
      >
        <Box sx={dotGridBg()} />
        <Box
          sx={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            filter: "blur(80px)",
            opacity: 0.15,
            background: "radial-gradient(circle, #DDD92A, transparent 70%)",
            top: "10%",
            left: "20%",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: 160,
            height: 160,
            borderRadius: "50%",
            filter: "blur(80px)",
            opacity: 0.08,
            background: "radial-gradient(circle, #6366F1, transparent 70%)",
            bottom: "10%",
            right: "20%",
          }}
        />
        <Box
          sx={{ textAlign: "center", position: "relative", zIndex: 2 }}
        >
          <Box
            sx={{
              ...glowChipSx,
              width: 56,
              height: 56,
              mx: "auto",
              mb: 1.5,
            }}
          >
            <Room sx={{ fontSize: 24, color: "#2D2A32" }} />
          </Box>
          <Typography variant="h4" fontWeight={700} color="#FAFDF6">
            {venue.city}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(250,253,246,0.45)", mt: 0.5 }}
          >
            {venue.neighborhood}
          </Typography>
        </Box>
        {mapUrl && (
          <Box
            component="a"
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(8px)",
              color: "#A9A7B0",
              transition: "all 0.2s",
              "&:hover": {
                color: "primary.main",
                bgcolor: "rgba(221,217,42,0.1)",
              },
            }}
          >
            <Language sx={{ fontSize: 14 }} />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: cardBg,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Business sx={{ fontSize: 16, color: "primary.main" }} />
          <Box>
            <Typography variant="h6" fontWeight={700} color="#FAFDF6">
              {venue.name}
            </Typography>
            <Typography variant="body2" color="#A9A7B0">
              {venue.neighborhood}, {venue.city}
            </Typography>
          </Box>
        </Box>
        <Chip
          label={`${venue.totalRooms} rooms`}
          variant="outlined"
          sx={{
            fontWeight: 600,
            fontSize: "0.65rem",
            letterSpacing: 0.5,
            textTransform: "uppercase",
            borderStyle: "dashed",
            borderColor: "rgba(255,255,255,0.12)",
            color: "#A9A7B0",
          }}
        />
      </Box>
    </Box>
  );
}

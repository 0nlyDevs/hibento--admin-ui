import { Box, Typography, Chip, Card } from "@mui/material";
import { MeetingRoom, Business } from "@mui/icons-material";
import { dotGridBg, glowChipSx } from "../venues/constants";
import type { Room } from "../../types";

interface RoomCardProps {
  room: Room;
  onClick?: () => void;
}

export function RoomCard({ room, onClick }: RoomCardProps) {
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
          bgcolor: "secondary.dark",
          overflow: "hidden",
        }}
      >
        <Box sx={dotGridBg()} />
        <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <Box sx={{ ...glowChipSx, width: 38, height: 38, mx: "auto", mb: 1 }}>
            <MeetingRoom sx={{ fontSize: 16, color: "secondary.main" }} />
          </Box>
          <Typography variant="body1" fontWeight={700} color="text.primary">
            {room.name}
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
            {room.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, mt: 1.5, flexWrap: "wrap" }}>
          {room.capacity != null && (
            <Chip
              label={`Capacity: ${room.capacity}`}
              size="small"
              variant="outlined"
              sx={{
                fontWeight: 600,
                fontSize: "0.55rem",
                letterSpacing: 0.5,
                textTransform: "uppercase",
                borderStyle: "dashed",
                borderColor: "rgba(255,255,255,0.15)",
                color: "text.secondary",
                height: 20,
              }}
            />
          )}
          {room.venueId && (
            <Chip
              label={`Venue: ${room.venueId.slice(0, 8)}...`}
              size="small"
              variant="outlined"
              sx={{
                fontWeight: 600,
                fontSize: "0.55rem",
                letterSpacing: 0.5,
                textTransform: "uppercase",
                borderStyle: "dashed",
                borderColor: "rgba(255,255,255,0.15)",
                color: "text.secondary",
                height: 20,
              }}
            />
          )}
        </Box>
      </Box>
    </Card>
  );
}

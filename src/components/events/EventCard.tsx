import { Box, Typography, Chip, Card } from "@mui/material";
import { Event, Schedule } from "@mui/icons-material";
import { dotGridBg, glowChipSx } from "../venues/constants";
import { StatusBadge } from "../common/StatusBadge";
import { getEventStatus } from "../../utils";
import type { Event as EventType } from "../../types";

interface EventCardProps {
  event: EventType;
  onClick?: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const status = getEventStatus(event.startDate, event.endDate);

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
            <Event sx={{ fontSize: 16, color: "secondary.main" }} />
          </Box>
          <Typography variant="body1" fontWeight={700} color="text.primary">
            {startDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
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
            {endDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: 2, py: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.25 }}>
          <Schedule sx={{ fontSize: 14, color: "primary.main" }} />
          <Typography
            variant="subtitle2"
            fontWeight={600}
            noWrap
            color="text.primary"
          >
            {event.title}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.75 }}>
          <StatusBadge status={status} size="small" />
          {event.online && (
            <Chip
              label="Online"
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
          )}
        </Box>
      </Box>
    </Card>
  );
}

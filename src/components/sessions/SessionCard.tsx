import { Box, Typography, Chip, Card } from "@mui/material";
import { Schedule, MeetingRoom, People } from "@mui/icons-material";
import { dotGridBg, glowChipSx } from "../venues/constants";
import { LiveBadge } from "../common/StatusBadge";
import { isSessionLive } from "../../utils";
import type { Session } from "../../types";

interface SessionCardProps {
  session: Session;
  onClick?: () => void;
}

export function SessionCard({ session, onClick }: SessionCardProps) {
  const startTime = new Date(session.startTime);
  const endTime = new Date(session.endTime);
  const live = isSessionLive(session.startTime, session.endTime);

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
            <Schedule sx={{ fontSize: 16, color: "secondary.main" }} />
          </Box>
          <Typography variant="body1" fontWeight={700} color="text.primary">
            {startTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
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
            {startTime.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}{" "}
            —{" "}
            {endTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Box>
        {live && (
          <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
            <LiveBadge isLive />
          </Box>
        )}
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
            {session.title}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1.5, mt: 1.5, flexWrap: "wrap" }}>
          {session.roomName && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <MeetingRoom sx={{ fontSize: 13, color: "text.disabled" }} />
              <Typography variant="caption" color="text.secondary">
                {session.roomName}
              </Typography>
            </Box>
          )}
          {session.speakers?.length > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <People sx={{ fontSize: 13, color: "text.disabled" }} />
              <Typography variant="caption" color="text.secondary">
                {session.speakers.length} speaker{session.speakers.length !== 1 ? "s" : ""}
              </Typography>
            </Box>
          )}
          {session.capacity && (
            <Chip
              label={`Cap: ${session.capacity}`}
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

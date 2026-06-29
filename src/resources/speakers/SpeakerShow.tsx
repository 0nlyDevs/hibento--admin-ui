import {
  Show,
  useRecordContext,
  type ShowProps,
  TabbedShowLayout,
  Tab,
  Datagrid,
  TextField,
  DateField,
  FunctionField,
} from "react-admin";
import { Box, Typography, Divider, Button, Chip } from "@mui/material";
import { Language, Schedule, Public, GitHub, X, LinkedIn, Facebook, Instagram, Link } from "@mui/icons-material";
import type { Speaker } from "../../types";
import { dotGridBg, glowChipSx } from "../../components/venues/constants";
import type { ReactNode } from "react";

const LINK_CONFIG: Record<string, { label: string; color: string; icon: ReactNode }> = {
  website: { label: "Website", color: "text.disabled", icon: <Public sx={{ fontSize: 16 }} /> },
  github: { label: "GitHub", color: "#333", icon: <GitHub sx={{ fontSize: 16 }} /> },
  x: { label: "X", color: "#1DA1F2", icon: <X sx={{ fontSize: 16 }} /> },
  linkedin: { label: "LinkedIn", color: "#0A66C2", icon: <LinkedIn sx={{ fontSize: 16 }} /> },
  facebook: { label: "Facebook", color: "#1877F2", icon: <Facebook sx={{ fontSize: 16 }} /> },
  instagram: { label: "Instagram", color: "#E4405F", icon: <Instagram sx={{ fontSize: 16 }} /> },
  other: { label: "Other", color: "text.disabled", icon: <Link sx={{ fontSize: 16 }} /> },
};

function SpeakerProfile() {
  const record = useRecordContext<Speaker>();
  if (!record) return null;

  const initials = record.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
          bgcolor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
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
            bgcolor: "secondary.dark",
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
              background: "radial-gradient(circle, rgba(221,217,42,0.12) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(221,217,42,0.08) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <Box
              sx={{
                ...glowChipSx,
                width: 88,
                height: 88,
                mx: "auto",
                mb: 1.5,
                fontSize: 32,
                fontWeight: 700,
                color: "secondary.main",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {initials}
              </Box>
              {record.avatarUrl && (
                <Box
                  component="img"
                  src={record.avatarUrl}
                  alt={record.name}
                  sx={{ width: "100%", height: "100%", objectFit: "cover", position: "relative", zIndex: 1 }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
            </Box>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              {record.name}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Language sx={{ color: "primary.main", fontSize: 20 }} />
            <Typography variant="subtitle1" fontWeight={700} color="text.primary">
              Bio
            </Typography>
          </Box>
          <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.06)" }} />
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {record.bio || (
              <Typography component="span" fontStyle="italic" color="text.disabled">
                No bio provided
              </Typography>
            )}
          </Typography>
        </Box>
      </Box>

      {/* Social Links card */}
      {record.externalLinks && record.externalLinks.length > 0 && (
        <Box
          sx={{
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.06)",
            bgcolor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
            p: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Language sx={{ color: "primary.main", fontSize: 20 }} />
            <Typography variant="subtitle1" fontWeight={700} color="text.primary">
              Social Links
            </Typography>
          </Box>
          <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.06)" }} />
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            {record.externalLinks.map((link, i) => {
              const cfg = LINK_CONFIG[link.type.toLowerCase()] || { label: link.type, color: "text.disabled", icon: <Link sx={{ fontSize: 16 }} /> };
              return (
                <Button
                  key={i}
                  variant="contained"
                  size="small"
                  startIcon={cfg.icon}
                  onClick={() => window.open(link.url, "_blank")}
                  sx={{
                    backgroundColor: cfg.color,
                    color: "#fff",
                    borderRadius: "8px",
                    textTransform: "capitalize",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    px: "14px",
                    py: "5px",
                    minWidth: 0,
                    "&:hover": {
                      backgroundColor: cfg.color,
                      filter: "brightness(1.2)",
                    },
                  }}
                >
                  {cfg.label}
                </Button>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}

function SessionsTab() {
  const record = useRecordContext<Speaker>();
  if (!record?.eventSessions?.length) {
    return (
      <Box
        sx={{
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.06)",
          bgcolor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
          p: 4,
          textAlign: "center",
        }}
      >
        <Schedule sx={{ fontSize: 40, color: "text.disabled", mb: 1.5 }} />
        <Typography variant="body1" color="text.secondary">
          No sessions assigned to this speaker yet.
        </Typography>
        <Typography variant="caption" color="text.disabled">
          Sessions can be assigned when creating or editing an event session.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.06)",
        bgcolor: "rgba(255, 255, 255, 0.05)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: 3, pb: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <Schedule sx={{ color: "primary.main", fontSize: 20 }} />
          <Typography variant="subtitle1" fontWeight={700} color="text.primary">
            Sessions ({record.eventSessions.length})
          </Typography>
        </Box>
        <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.06)" }} />
      </Box>
      <Datagrid
        data={record.eventSessions}
        bulkActionButtons={false}
        rowClick={(id) => `/sessions/${id}/show`}
        sx={{
          "& .RaDatagrid-headerCell": {
            fontWeight: 600,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          },
        }}
      >
        <TextField source="title" sx={{ fontWeight: 600 }} />
        <TextField source="eventName" label="Event" />
        <DateField source="startTime" label="Start" showTime />
        <DateField source="endTime" label="End" showTime />
        <TextField source="room" label="Room" />
        <FunctionField
          label="Status"
          render={(r: { isLive?: boolean }) =>
            r.isLive ? (
              <Chip
                label="Live"
                size="small"
                sx={{
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  color: "#10B981",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                }}
              />
            ) : null
          }
        />
      </Datagrid>
    </Box>
  );
}

export function SpeakerShow(props: ShowProps) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Profile">
          <SpeakerProfile />
        </Tab>
        <Tab label="Sessions" path="sessions">
          <SessionsTab />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}

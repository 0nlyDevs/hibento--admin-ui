import {
  List,
  CreateButton,
  useListContext,
  type ListProps,
} from "react-admin";
import { Box, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Speaker } from "../../types";
import { SearchBar } from "../../components/common/SearchBar";
import { dotGridBg, glowChipSx } from "../../components/venues/constants";
import Public from "@mui/icons-material/Public";
import GitHub from "@mui/icons-material/GitHub";
import X from "@mui/icons-material/X";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Link from "@mui/icons-material/Link";
import type { ReactNode } from "react";

const LINK_CONFIG: Record<
  string,
  { label: string; color: string; icon: ReactNode }
> = {
  website: {
    label: "Website",
    color: "#6B6973",
    icon: <Public sx={{ fontSize: 13 }} />,
  },
  github: {
    label: "GitHub",
    color: "#333",
    icon: <GitHub sx={{ fontSize: 13 }} />,
  },
  x: { label: "X", color: "#1DA1F2", icon: <X sx={{ fontSize: 13 }} /> },
  linkedin: {
    label: "LinkedIn",
    color: "#0A66C2",
    icon: <LinkedIn sx={{ fontSize: 13 }} />,
  },
  facebook: {
    label: "Facebook",
    color: "#1877F2",
    icon: <Facebook sx={{ fontSize: 13 }} />,
  },
  instagram: {
    label: "Instagram",
    color: "#E4405F",
    icon: <Instagram sx={{ fontSize: 13 }} />,
  },
  other: {
    label: "Other",
    color: "#6B6973",
    icon: <Link sx={{ fontSize: 13 }} />,
  },
};

function SpeakerCard({
  speaker,
  onClick,
}: {
  speaker: Speaker;
  onClick: () => void;
}) {
  const initials = speaker.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const links = speaker.externalLinks?.slice(0, 3) ?? [];

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: "pointer",
        background: "rgba(255, 255, 255, 0.05)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        },
      }}
    >
      <Box
        sx={{
          height: 140,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          bgcolor: "#1A1820",
          overflow: "hidden",
        }}
      >
        <Box sx={dotGridBg()} />
        <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Box
            sx={{
              ...glowChipSx,
              width: 64,
              height: 64,
              mx: "auto",
              mb: 1,
              fontSize: 24,
              fontWeight: 700,
              color: "#2D2A32",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {initials}
            </Box>
            {speaker.avatarUrl && (
              <Box
                component="img"
                src={speaker.avatarUrl}
                alt={speaker.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "relative",
                  zIndex: 1,
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
          </Box>
          <Typography variant="body1" fontWeight={700} color="#FAFDF6">
            {speaker.name}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          px: 2,
          py: 1.5,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {speaker.bio && (
          <Typography
            variant="caption"
            sx={{
              color: "#A9A7B0",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mb: "auto",
            }}
          >
            {speaker.bio}
          </Typography>
        )}

        {links.length > 0 && (
          <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mt: 1.5 }}>
            {links.map((link, i) => {
              const cfg = LINK_CONFIG[link.type.toLowerCase()] || {
                label: link.type,
                color: "#6B6973",
                icon: <Link sx={{ fontSize: 13 }} />,
              };
              return (
                <Box
                  key={i}
                  component="span"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontWeight: 600,
                    fontSize: "0.6rem",
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    border: "1px dashed rgba(255,255,255,0.15)",
                    color: cfg.color,
                    borderRadius: "4px",
                    px: "6px",
                    py: "2px",
                  }}
                >
                  {cfg.icon}
                  {cfg.label}
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Card>
  );
}

function SpeakerGrid() {
  const { data, isLoading, total } = useListContext<Speaker>();
  const navigate = useNavigate();

  if (isLoading) return null;

  return (
    <Box sx={{ p: 2 }}>
      <Card
        sx={{
          p: "20px 24px",
          mb: 3,
          background: "rgba(255, 255, 255, 0.05)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={700} color="#FAFDF6">
              Speakers
            </Typography>
            <Typography variant="body2" color="#A9A7B0">
              {total} speaker{total !== 1 ? "s" : ""}
            </Typography>
          </Box>
          <CreateButton
            sx={{
              backgroundColor: "#DDD92A",
              color: "#2D2A32",
              fontWeight: 600,
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#C4C026" },
            }}
          />
        </Box>
        <SearchBar placeholder="Search speakers..." />
      </Card>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
          },
          gap: "20px",
        }}
      >
        {data?.map((record) => (
          <SpeakerCard
            key={record.id}
            speaker={record}
            onClick={() => navigate(`/speakers/${record.id}/show`)}
          />
        ))}
      </Box>
    </Box>
  );
}

export function SpeakerList(props: ListProps) {
  return (
    <List
      {...props}
      sort={{ field: "name", order: "ASC" }}
      actions={false}
      component="div"
    >
      <SpeakerGrid />
    </List>
  );
}

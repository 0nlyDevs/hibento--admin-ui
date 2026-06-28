import {
  Show,
  useRecordContext,
  type ShowProps,
} from "react-admin";
import { Box, Typography, Button } from "@mui/material";
import type { Speaker } from "../../types";

const LINK_CONFIG: Record<string, { label: string; color: string }> = {
  github: { label: "GitHub", color: "#333" },
  x: { label: "X", color: "#1DA1F2" },
  linkedin: { label: "LinkedIn", color: "#0A66C2" },
  facebook: { label: "Facebook", color: "#1877F2" },
  instagram: { label: "Instagram", color: "#E4405F" },
  website: { label: "Website", color: "#6B6973" },
};

function SpeakerLayout() {
  const record = useRecordContext<Speaker>();
  if (!record) return null;

  const initials = record.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          backgroundColor: "#2D2A32",
          borderRadius: "12px",
          border: "1px solid #413E48",
          p: "32px",
          display: "flex",
          gap: "32px",
          alignItems: "flex-start",
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        <Box sx={{ textAlign: "center", minWidth: 120 }}>
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              backgroundColor: "#38353E",
              mx: "auto",
              mb: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
              color: "#A9A7B0",
              border: "3px solid #DDD92A",
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
          <Typography variant="h5" fontWeight={700} color="#FAFDF6">
            {record.name}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              color="#A9A7B0"
              sx={{
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                mb: 1,
                display: "block",
              }}
            >
              Bio
            </Typography>
            <Typography variant="body2" color="#FAFDF6" sx={{ lineHeight: 1.7 }}>
              {record.bio || (
                <Typography component="span" fontStyle="italic" color="#6B6973">
                  No bio provided
                </Typography>
              )}
            </Typography>
          </Box>

          {record.externalLinks && record.externalLinks.length > 0 && (
            <Box>
              <Typography
                variant="caption"
                color="#A9A7B0"
                sx={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  mb: 1,
                  display: "block",
                }}
              >
                Social Links
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {record.externalLinks.map((link, i) => {
                  const config = LINK_CONFIG[link.type] || {
                    label: link.type,
                    color: "#6B6973",
                  };
                  return (
                    <Button
                      key={i}
                      variant="contained"
                      size="small"
                      onClick={() => window.open(link.url, "_blank")}
                      sx={{
                        backgroundColor: config.color,
                        color: "#fff",
                        borderRadius: "6px",
                        textTransform: "capitalize",
                        fontWeight: 500,
                        fontSize: "0.8rem",
                        px: "12px",
                        py: "4px",
                        minWidth: 0,
                        "&:hover": {
                          backgroundColor: config.color,
                          filter: "brightness(1.15)",
                        },
                      }}
                    >
                      {config.label}
                    </Button>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export function SpeakerShow(props: ShowProps) {
  return (
    <Show {...props}>
      <SpeakerLayout />
    </Show>
  );
}

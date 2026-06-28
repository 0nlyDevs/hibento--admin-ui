import {
  List,
  CreateButton,
  useListContext,
  type ListProps,
  type RaRecord,
} from "react-admin";
import { Box, Grid, Typography, InputAdornment, TextField } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import type { Speaker } from "../../types";

const LINK_COLORS: Record<string, string> = {
  github: "#333",
  x: "#1DA1F2",
  linkedin: "#0A66C2",
  facebook: "#1877F2",
  instagram: "#E4405F",
  website: "#6B6973",
};

function SpeakerCard({ speaker, onClick }: { speaker: Speaker; onClick: () => void }) {
  const initials = speaker.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor: "#2D2A32",
        borderRadius: "12px",
        border: "1px solid #413E48",
        p: "24px",
        textAlign: "center",
        cursor: "pointer",
        transition: "border-color 0.2s, box-shadow 0.2s",
        "&:hover": {
          borderColor: "#DDD92A",
          boxShadow: "0 0 0 1px rgba(221, 217, 42, 0.15)",
        },
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          backgroundColor: "#38353E",
          mx: "auto",
          mb: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          fontWeight: 600,
          color: "#A9A7B0",
          border: "2px solid #413E48",
          backgroundImage: speaker.avatarUrl
            ? `url(${speaker.avatarUrl})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!speaker.avatarUrl && initials}
      </Box>
      <Typography
        variant="subtitle1"
        fontWeight={600}
        color="#FAFDF6"
        noWrap
      >
        {speaker.name}
      </Typography>
      {speaker.bio && (
        <Typography
          variant="body2"
          color="#A9A7B0"
          sx={{
            mt: 0.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.4,
          }}
        >
          {speaker.bio}
        </Typography>
      )}
      {speaker.externalLinks && speaker.externalLinks.length > 0 && (
        <Box sx={{ display: "flex", gap: "6px", justifyContent: "center", mt: 1.5, flexWrap: "wrap" }}>
          {speaker.externalLinks.map((link, i) => (
            <Typography
              key={i}
              component="span"
              sx={{
                backgroundColor: LINK_COLORS[link.type] || "#6B6973",
                color: "#fff",
                borderRadius: "4px",
                px: "8px",
                py: "2px",
                fontSize: "0.7rem",
                fontWeight: 500,
                textTransform: "capitalize",
              }}
            >
              {link.type === "x" ? "X" : link.type}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}

function SpeakerGrid() {
  const { data, isLoading, total, filterValues, setFilters } =
    useListContext<Speaker & RaRecord>();
  const navigate = useNavigate();

  if (isLoading) return null;

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          backgroundColor: "#2D2A32",
          borderRadius: "12px",
          p: "20px 24px",
          mb: 3,
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
        <TextField
          value={filterValues?.q || ""}
          onChange={(e) => setFilters({ q: e.target.value }, undefined, false)}
          placeholder="Search speakers..."
          variant="outlined"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#6B6973" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#38353E",
              borderRadius: "8px",
              color: "#FAFDF6",
              fontSize: "0.9rem",
              "& fieldset": { borderColor: "#413E48" },
              "&:hover fieldset": { borderColor: "#6B6973" },
              "&.Mui-focused fieldset": { borderColor: "#DDD92A", borderWidth: "2px" },
            },
            "& .MuiInputBase-input::placeholder": { color: "#6B6973", opacity: 1 },
          }}
        />
      </Box>
      <Grid container spacing={2.5}>
        {data?.map((record) => (
          <Grid key={record.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <SpeakerCard
              speaker={record}
              onClick={() => navigate(`/speakers/${record.id}/show`)}
            />
          </Grid>
        ))}
      </Grid>
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

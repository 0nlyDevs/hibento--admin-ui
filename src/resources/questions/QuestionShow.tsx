import {
  Show,
  TextField,
  NumberField,
  DateField,
  useRecordContext,
  type ShowProps,
} from "react-admin";
import { Box, Typography, Divider, Chip } from "@mui/material";
import { Forum, Person, ThumbUp, CalendarToday } from "@mui/icons-material";
import { dotGridBg, glowChipSx } from "../../components/venues/constants";

function QuestionHero() {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <Box sx={{ borderRadius: "12px", border: 1, borderColor: "divider", overflow: "hidden", mb: 3 }}>
      <Box sx={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", bgcolor: "#1A1820", overflow: "hidden" }}>
        <Box sx={dotGridBg()} />
        <Box sx={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", filter: "blur(80px)", opacity: 0.15, background: "radial-gradient(circle, #DDD92A, transparent 70%)", top: "10%", left: "20%" }} />
        <Box sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <Box sx={{ ...glowChipSx, width: 48, height: 48, mx: "auto", mb: 1 }}>
            <Forum sx={{ fontSize: 20, color: "#2D2A32" }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="#FAFDF6">
            Question Details
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function QuestionDetail() {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <Box sx={{ borderRadius: "12px", border: 1, borderColor: "divider", bgcolor: "background.paper", p: 3, mb: 3 }}>
      <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3, fontStyle: "italic", color: "text.secondary" }}>
        "{record.content}"
      </Typography>
      <Divider sx={{ mb: 2, borderColor: "divider" }} />
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Person sx={{ fontSize: 18, color: "primary.main" }} />
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem", letterSpacing: 0.8, textTransform: "uppercase", display: "block" }}>
              Author
            </Typography>
            <TextField source="authorName" />
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ThumbUp sx={{ fontSize: 18, color: "primary.main" }} />
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem", letterSpacing: 0.8, textTransform: "uppercase", display: "block" }}>
              Upvotes
            </Typography>
            <NumberField source="upvotes" />
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarToday sx={{ fontSize: 18, color: "primary.main" }} />
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem", letterSpacing: 0.8, textTransform: "uppercase", display: "block" }}>
              Submitted At
            </Typography>
            <DateField source="createdAt" showTime />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function QuestionShow(props: ShowProps) {
  return (
    <Show {...props}>
      <QuestionHero />
      <QuestionDetail />
    </Show>
  );
}

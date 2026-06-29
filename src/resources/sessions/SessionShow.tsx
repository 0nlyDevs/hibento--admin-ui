import {
  Show,
  DateField,
  NumberField,
  TextField,
  TabbedShowLayout,
  Tab,
  ReferenceManyField,
  Datagrid,
  useRecordContext,
  useGetOne,
  useGetList,
  EditButton,
  DeleteButton,
  type ShowProps,
} from "react-admin";
import { Box, Typography, Divider, Chip } from "@mui/material";
import { Schedule, Event, Room, People, Language, Forum } from "@mui/icons-material";
import { LiveBadge } from "../../components/common/StatusBadge";
import { isSessionLive } from "../../utils";
import { dotGridBg, glowChipSx } from "../../components/venues/constants";
import { useNavigate } from "react-router-dom";
import type { Session, SpeakerRef } from "../../types";

function SessionHero() {
  const record = useRecordContext<Session>();
  if (!record) return null;

  return (
    <Box sx={{ borderRadius: "12px", border: 1, borderColor: "divider", overflow: "hidden", mb: 3 }}>
      <Box sx={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", bgcolor: "secondary.dark", overflow: "hidden" }}>
        <Box sx={dotGridBg()} />
        <Box sx={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", filter: "blur(80px)", opacity: 0.15, background: "radial-gradient(circle, #DDD92A, transparent 70%)", top: "10%", left: "20%" }} />
        <Box sx={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", filter: "blur(80px)", opacity: 0.08, background: "radial-gradient(circle, #6366F1, transparent 70%)", bottom: "10%", right: "20%" }} />
        <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 3, display: "flex", gap: 1 }}>
          <EditButton
            sx={{
              color: "text.primary",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              backdropFilter: "blur(4px)",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
            }}
          />
          <DeleteButton
            sx={{
              color: "text.primary",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              backdropFilter: "blur(4px)",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
            }}
          />
        </Box>
        <Box sx={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <Box sx={{ ...glowChipSx, width: 56, height: 56, mx: "auto", mb: 1.5 }}>
            <Schedule sx={{ fontSize: 24, color: "secondary.main" }} />
          </Box>
          <Typography variant="h4" fontWeight={700} color="text.primary">
            {record.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mt: 1 }}>
            <LiveBadge isLive={isSessionLive(record.startTime, record.endTime)} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function DetailCards() {
  const record = useRecordContext<Session>();
  const navigate = useNavigate();
  if (!record) return null;

  return (
    <Box>
      {/* Schedule card */}
      <Box sx={{ borderRadius: "12px", border: 1, borderColor: "rgba(255,255,255,0.06)", bgcolor: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <Schedule sx={{ color: "primary.main", fontSize: 20 }} />
          <Typography variant="subtitle1" fontWeight={700} color="text.primary">
            Schedule
          </Typography>
        </Box>
        <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.06)" }} />
        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <Box>
            <Typography variant="caption" sx={{ fontSize: "0.65rem", letterSpacing: 0.8, textTransform: "uppercase", display: "block", mb: 0.5, color: "text.disabled" }}>
              Start Time
            </Typography>
            <DateField source="startTime" showTime />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ fontSize: "0.65rem", letterSpacing: 0.8, textTransform: "uppercase", display: "block", mb: 0.5, color: "text.disabled" }}>
              End Time
            </Typography>
            <DateField source="endTime" showTime />
          </Box>
        </Box>
      </Box>

      {/* Details card */}
      <Box sx={{ borderRadius: "12px", border: 1, borderColor: "rgba(255,255,255,0.06)", bgcolor: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <Language sx={{ color: "primary.main", fontSize: 20 }} />
          <Typography variant="subtitle1" fontWeight={700} color="text.primary">
            Details
          </Typography>
        </Box>
        <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.06)" }} />
        {record.description && (
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
            {record.description}
          </Typography>
        )}
        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <Box>
            <Typography variant="caption" sx={{ fontSize: "0.65rem", letterSpacing: 0.8, textTransform: "uppercase", display: "block", mb: 0.5, color: "text.disabled" }}>
              Room
            </Typography>
            {record.roomName ? (
              <Typography variant="body2" color="text.secondary">
                {record.roomName}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary" fontStyle="italic">Online</Typography>
            )}
          </Box>
          <Box>
            <Typography variant="caption" sx={{ fontSize: "0.65rem", letterSpacing: 0.8, textTransform: "uppercase", display: "block", mb: 0.5, color: "text.disabled" }}>
              Capacity
            </Typography>
            <NumberField source="capacity" />
          </Box>
        </Box>
      </Box>

      {/* Event card */}
      {record.eventId && <EventCard eventId={record.eventId} />}

      {/* Speakers card */}
      {(record.speakers?.length > 0 || record.speakerIds?.length > 0) && (
        <SpeakersCard speakers={record.speakers} speakerIds={record.speakerIds} />
      )}
    </Box>
  );
}

function EventCard({ eventId }: { eventId: string }) {
  const navigate = useNavigate();
  const { data: eventData } = useGetOne("events", { id: eventId }, { enabled: !!eventId });
  return (
    <Box sx={{ borderRadius: "12px", border: 1, borderColor: "rgba(255,255,255,0.06)", bgcolor: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", p: 3, mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Event sx={{ color: "primary.main", fontSize: 20 }} />
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          Event
        </Typography>
      </Box>
      <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.06)" }} />
      <Typography
        variant="body2"
        color="primary"
        sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
        onClick={() => navigate(`/events/${eventId}/show`)}
      >
        {eventData?.title || eventId}
      </Typography>
    </Box>
  );
}

function SpeakersCard({ speakers: inlineSpeakers, speakerIds }: { speakers?: SpeakerRef[]; speakerIds?: string[] }) {
  const { data: fetchedSpeakers } = useGetList("speakers", {
    pagination: { page: 1, perPage: 200 },
    sort: { field: "name", order: "ASC" },
  });
  const navigate = useNavigate();
  const sessionSpeakers = inlineSpeakers ?? fetchedSpeakers?.filter((s: any) => speakerIds?.includes(s.id));

  return (
    <Box sx={{ borderRadius: "12px", border: 1, borderColor: "rgba(255,255,255,0.06)", bgcolor: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", p: 3, mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <People sx={{ color: "primary.main", fontSize: 20 }} />
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          Speakers ({sessionSpeakers?.length ?? 0})
        </Typography>
      </Box>
      <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.06)" }} />
      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
        {sessionSpeakers?.map((sp: any) => (
          <Chip
            key={sp.id}
            label={sp.name}
            component="a"
            href={`#/speakers/${sp.id}/show`}
            clickable
            variant="outlined"
            sx={{ fontWeight: 600, borderStyle: "dashed", borderColor: "rgba(255,255,255,0.15)", color: "text.secondary", "&:hover": { borderColor: "primary.main", color: "primary.main" } }}
          />
        ))}
      </Box>
    </Box>
  );
}

function QuestionsTab() {
  const record = useRecordContext<Session>();

  if (!record) return null;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Forum sx={{ color: "primary.main", fontSize: 20 }} />
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          Questions
        </Typography>
      </Box>
      <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.06)" }} />
      <ReferenceManyField
        reference="questions"
        target="eventSessionId"
        filter={{ eventSessionId: record.id }}
      >
        <Datagrid bulkActionButtons={false} sx={{ "& .RaDatagrid-headerCell": { fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" } }}>
          <TextField source="content" label="Question" />
          <TextField source="authorName" label="Author" />
          <NumberField source="upvotes" label="Upvotes" />
        </Datagrid>
      </ReferenceManyField>
    </Box>
  );
}

export function SessionShow(props: ShowProps) {
  return (
    <Show {...props} actions={false}>
      <SessionHero />
      <TabbedShowLayout>
        <Tab label="Details">
          <DetailCards />
        </Tab>
        <Tab label="Questions" path="questions">
          <QuestionsTab />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}

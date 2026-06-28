import {
  Show,
  TextField,
  DateField,
  Datagrid,
  NumberField,
  FunctionField,
  ReferenceField,
  TabbedShowLayout,
  Tab,
  useRecordContext,
  useGetList,
  useGetManyReference,
  ListContextProvider,
  useList,
  type ShowProps,
} from "react-admin";
import {
  Box,
  Typography,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import { Schedule, Event as EventIcon, Language, Add, Public, People } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/common/Loading";
import { dotGridBg, glowChipSx } from "../../components/venues/constants";
import { StatusBadge } from "../../components/common/StatusBadge";
import { getEventStatus } from "../../utils";
import { dotGridBg, glowChipSx } from "../../components/venues/constants";
import type { Event } from "../../types";

function EventHero() {
  const record = useRecordContext<Event>();
  if (!record) return null;

  const startDate = new Date(record.startDate);
  const endDate = new Date(record.endDate);
  const status = getEventStatus(record.startDate, record.endDate);

  return (
    <Box
      sx={{
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
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
          bgcolor: "#1A1820",
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
        <Box sx={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <Box sx={{ ...glowChipSx, width: 56, height: 56, mx: "auto", mb: 1.5 }}>
            <EventIcon sx={{ fontSize: 24, color: "#2D2A32" }} />
          </Box>
          <Typography variant="h4" fontWeight={700} color="#FAFDF6">
            {record.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mt: 1 }}>
            <StatusBadge status={status} size="medium" />
            {record.online && (
              <Chip
                label="Online"
                size="small"
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
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Schedule sx={{ fontSize: 16, color: "primary.main" }} />
          <Box>
            <Typography variant="h6" fontWeight={700} color="#FAFDF6">
              {startDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </Typography>
            <Typography variant="body2" color="#A9A7B0">
              {startDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} — {endDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            </Typography>
          </Box>
        </Box>
        {record.venueId && (
          <Chip
            label="View Venue"
            component="a"
            href={`#/venues/${record.venueId}/show`}
            clickable
            variant="outlined"
            sx={{
              fontWeight: 600,
              fontSize: "0.65rem",
              letterSpacing: 0.5,
              textTransform: "uppercase",
              borderStyle: "dashed",
              borderColor: "rgba(255,255,255,0.12)",
              color: "#A9A7B0",
              "&:hover": { color: "primary.main", borderColor: "primary.main" },
            }}
          />
        )}
      </Box>
    </Box>
  );
}

function DetailCards() {
  const record = useRecordContext<Event>();
  if (!record) return null;

  return (
    <Box>
      <EventHero />

      <Box
        sx={{
          borderRadius: "12px",
          border: "1px solid",
          borderColor: "rgba(255,255,255,0.06)",
          bgcolor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
          p: 3,
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <Language sx={{ color: "primary.main", fontSize: 20 }} />
          <Typography variant="subtitle1" fontWeight={700} color="#FAFDF6">
            Event Details
          </Typography>
        </Box>
        <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.06)" }} />
        <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          <Box>
            <Typography variant="caption" sx={{ fontSize: "0.65rem", letterSpacing: 0.8, textTransform: "uppercase", display: "block", mb: 0.5, color: "#6B6973" }}>
              Start Date
            </Typography>
            <DateField source="startDate" showTime />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ fontSize: "0.65rem", letterSpacing: 0.8, textTransform: "uppercase", display: "block", mb: 0.5, color: "#6B6973" }}>
              End Date
            </Typography>
            <DateField source="endDate" showTime />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ fontSize: "0.65rem", letterSpacing: 0.8, textTransform: "uppercase", display: "block", mb: 0.5, color: "#6B6973" }}>
              Online
            </Typography>
            <Chip
              label={record.online ? "Yes" : "No"}
              size="small"
              variant="outlined"
              sx={{ fontWeight: 600, fontSize: "0.7rem", borderStyle: "dashed", borderColor: "rgba(255,255,255,0.12)", color: "#A9A7B0" }}
            />
          </Box>
          {record.venueId && (
            <Box>
              <Typography variant="caption" sx={{ fontSize: "0.65rem", letterSpacing: 0.8, textTransform: "uppercase", display: "block", mb: 0.5, color: "#6B6973" }}>
                Venue
              </Typography>
              <Box
                component="a"
                href={`#/venues/${record.venueId}/show`}
                sx={{ color: "primary.main", textDecoration: "none", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}
              >
                <ReferenceField source="venueId" reference="venues"><TextField source="name" /></ReferenceField>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {record.description && (
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
            <Typography variant="subtitle1" fontWeight={700} color="#FAFDF6">
              Description
            </Typography>
          </Box>
          <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.06)" }} />
          <Typography variant="body2" color="#A9A7B0" sx={{ lineHeight: 1.8 }}>
            {record.description}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

function SessionsTab() {
  const record = useRecordContext<Event>();
  const navigate = useNavigate();
  const { data, isLoading } = useGetList("sessions", {
    filter: { eventId: record?.id },
    pagination: { page: 1, perPage: 100 },
    sort: { field: "startTime", order: "ASC" },
  });
  const listContext = useList({ data, isLoading, total: data?.length });

  if (!record) return null;
  if (isLoading) return <Loading />;

  return (
    <Box sx={{ borderRadius: "12px", border: 1, borderColor: "divider", bgcolor: "background.paper", overflow: "hidden" }}>
      <Box sx={{ p: 3, pb: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Schedule sx={{ color: "primary.main", fontSize: 20 }} />
            <Typography variant="subtitle1" fontWeight={700} color="text.primary">
              Sessions ({data?.length ?? 0})
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            startIcon={<Add />}
            onClick={() => navigate("/sessions/create", { state: { record: { eventId: record.id } } })}
          >
            New Session
          </Button>
        </Box>
        <Divider sx={{ mb: 2, borderColor: "divider" }} />
      </Box>
      <ListContextProvider value={listContext}>
        <Datagrid rowClick={(id) => `/sessions/${id}/show`} sx={{ "& .RaDatagrid-headerCell": { fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" } }}>
          <TextField source="title" sx={{ fontWeight: 600 }} />
          <FunctionField label="Room" render={(r: any) => r.roomName || <Typography component="span" variant="body2" color="text.secondary">Online</Typography>} />
          <DateField source="startTime" label="Start" showTime />
          <DateField source="endTime" label="End" showTime />
          <NumberField source="capacity" />
        </Datagrid>
      </ListContextProvider>
    </Box>
  );
}

function RoomsTab() {
  const record = useRecordContext<Event>();
  const { data, isLoading } = useGetManyReference("rooms", {
    target: "venueId",
    id: record?.venueId,
    pagination: { page: 1, perPage: 50 },
    sort: { field: "name", order: "ASC" },
  }, { enabled: !!record?.venueId });
  const listContext = useList({ data: data ?? [], isLoading: false, total: data?.length ?? 0 });

  if (!record) return null;

  if (!record.venueId) {
    return (
      <Box sx={{ borderRadius: "12px", border: 1, borderColor: "divider", bgcolor: "background.paper", p: 3 }}>
        <Typography variant="body2" color="text.secondary" fontStyle="italic">
          Online event — no venue assigned
        </Typography>
      </Box>
    );
  }

  if (isLoading) return <Loading />;

  return (
    <Box sx={{ borderRadius: "12px", border: 1, borderColor: "divider", bgcolor: "background.paper", overflow: "hidden" }}>
      <Box sx={{ p: 3, pb: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <EventIcon sx={{ color: "primary.main", fontSize: 20 }} />
          <Typography variant="subtitle1" fontWeight={700} color="text.primary">
            Rooms ({data?.length ?? 0})
          </Typography>
        </Box>
        <Divider sx={{ mb: 2, borderColor: "divider" }} />
      </Box>
      <ListContextProvider value={listContext}>
        <Datagrid sx={{ "& .RaDatagrid-headerCell": { fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" } }}>
          <TextField source="name" />
          <NumberField source="capacity" />
        </Datagrid>
      </ListContextProvider>
    </Box>
  );
}

function SpeakersTab() {
  const record = useRecordContext<Event>();
  const navigate = useNavigate();
  if (!record) return null;

  const speakersMap = new Map<string, any>();
  record.eventSessions?.forEach((s: any) =>
    s.speakers?.forEach((sp: any) => {
      if (!speakersMap.has(sp.id)) speakersMap.set(sp.id, sp);
    }),
  );
  const speakers = Array.from(speakersMap.values());

  if (speakers.length === 0) {
    return (
      <Box sx={{ borderRadius: "12px", border: 1, borderColor: "divider", bgcolor: "background.paper", p: 3 }}>
        <Typography variant="body2" color="text.secondary" fontStyle="italic">
          No speakers assigned to this event
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 2 }}>
      {speakers.map((speaker) => {
        const initials = speaker.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
        return (
          <Box
            key={speaker.id}
            sx={{
              borderRadius: "12px",
              border: 1,
              borderColor: "divider",
              bgcolor: "background.paper",
              overflow: "hidden",
              cursor: "pointer",
              "&:hover": { borderColor: "primary.main", boxShadow: 2 },
            }}
            onClick={() => navigate(`/speakers/${speaker.id}/show`)}
          >
            <Box sx={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", bgcolor: "#1A1820", overflow: "hidden" }}>
              <Box sx={dotGridBg()} />
              <Box sx={{ ...glowChipSx, width: 56, height: 56, position: "relative", fontSize: 20, fontWeight: 700, color: "#2D2A32", overflow: "hidden" }}>
                <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {initials}
                </Box>
                {speaker.avatar && (
                  <Box component="img" src={speaker.avatar} alt={speaker.name} sx={{ width: "100%", height: "100%", objectFit: "cover", position: "relative", zIndex: 1 }} onError={(e: any) => { e.currentTarget.style.display = "none"; }} />
                )}
              </Box>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="body1" fontWeight={700} color="text.primary">
                {speaker.name}
              </Typography>
              {speaker.bio && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                  {speaker.bio}
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export function EventShow(props: ShowProps) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Details">
          <DetailCards />
        </Tab>
        <Tab label="Sessions" path="sessions">
          <SessionsTab />
        </Tab>
        <Tab label="Rooms" path="rooms">
          <RoomsTab />
        </Tab>
        <Tab label="Speakers" path="speakers">
          <SpeakersTab />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}

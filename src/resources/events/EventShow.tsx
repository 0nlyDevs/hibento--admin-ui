import {
  Show,
  TextField,
  DateField,
  Datagrid,
  NumberField,
  ReferenceField,
  TabbedShowLayout,
  Tab,
  useRecordContext,
  useGetList,
  useGetManyReference,
  useCreate,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
  MenuItem,
} from "@mui/material";
import { Schedule, Event as EventIcon, Language, Add } from "@mui/icons-material";
import { useState } from "react";
import { Loading } from "../../components/common/Loading";
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
  const [open, setOpen] = useState(false);
  const [speakerSearch, setSpeakerSearch] = useState("");
  const [form, setForm] = useState({ title: "", description: "", startTime: "", endTime: "", roomId: "", capacity: "", speakerIds: [] as string[] });
  const [create, { isLoading: isCreating }] = useCreate();
  const { data, isLoading, refetch } = useGetList("sessions", {
    filter: { eventId: record?.id },
    pagination: { page: 1, perPage: 100 },
    sort: { field: "startTime", order: "ASC" },
  });
  const { data: rooms } = useGetManyReference("rooms", {
    target: "venueId",
    id: record?.venueId,
    pagination: { page: 1, perPage: 50 },
    sort: { field: "name", order: "ASC" },
  });
  const { data: speakers } = useGetList("speakers", {
    pagination: { page: 1, perPage: 200 },
    sort: { field: "name", order: "ASC" },
  });
  const listContext = useList({ data, isLoading, total: data?.length });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const eventStart = record ? new Date(record.startDate) : null;
  const eventEnd = record ? new Date(record.endDate) : null;
  const sessionStart = form.startTime ? new Date(form.startTime) : null;
  const sessionEnd = form.endTime ? new Date(form.endTime) : null;
  const startOutOfRange = sessionStart && eventStart && sessionStart < eventStart;
  const endOutOfRange = sessionEnd && eventEnd && sessionEnd > eventEnd;
  const endBeforeStart = sessionStart && sessionEnd && sessionEnd <= sessionStart;
  const dateInvalid = startOutOfRange || endOutOfRange || endBeforeStart;

  const filteredSpeakers = speakers?.filter((s: any) =>
    s.name?.toLowerCase().includes(speakerSearch.toLowerCase()),
  );

  const handleCreate = async () => {
    await create("sessions", {
      data: {
        eventId: record?.id,
        title: form.title,
        description: form.description || undefined,
        startTime: sessionStart!.toISOString(),
        endTime: sessionEnd!.toISOString(),
        roomId: form.roomId,
        capacity: form.capacity ? Number(form.capacity) : undefined,
        speakerIds: form.speakerIds,
      },
    }, {
      onSuccess: () => {
        setOpen(false);
        setSpeakerSearch("");
        setForm({ title: "", description: "", startTime: "", endTime: "", roomId: "", capacity: "", speakerIds: [] });
        refetch();
      },
    });
  };

  if (!record) return null;
  if (isLoading) return <Loading />;

  return (
    <Box sx={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", bgcolor: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", overflow: "hidden" }}>
      <Box sx={{ p: 3, pb: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Schedule sx={{ color: "primary.main", fontSize: 20 }} />
            <Typography variant="subtitle1" fontWeight={700} color="#FAFDF6">
              Sessions ({data?.length ?? 0})
            </Typography>
          </Box>
          <Button variant="contained" size="small" startIcon={<Add />} onClick={() => setOpen(true)}>
            New Session
          </Button>
        </Box>
        <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.06)" }} />
      </Box>
      <ListContextProvider value={listContext}>
        <Datagrid sx={{ "& .RaDatagrid-headerCell": { fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" } }}>
          <TextField source="title" sx={{ fontWeight: 600 }} />
          <TextField source="roomName" label="Room" />
          <DateField source="startTime" label="Start" showTime />
          <DateField source="endTime" label="End" showTime />
          <NumberField source="capacity" />
        </Datagrid>
      </ListContextProvider>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Session</DialogTitle>
        <DialogContent>
          <MuiTextField label="Title" fullWidth value={form.title} onChange={set("title")} sx={{ mb: 2, mt: 1 }} />
          <MuiTextField label="Description" fullWidth multiline rows={3} value={form.description} onChange={set("description")} sx={{ mb: 2 }} />
          <MuiTextField
            label="Start Time"
            type="datetime-local"
            fullWidth
            value={form.startTime}
            onChange={set("startTime")}
            InputLabelProps={{ shrink: true }}
            error={!!startOutOfRange}
            helperText={startOutOfRange ? `Must be after ${eventStart?.toLocaleString()}` : ""}
            sx={{ mb: 2 }}
          />
          <MuiTextField
            label="End Time"
            type="datetime-local"
            fullWidth
            value={form.endTime}
            onChange={set("endTime")}
            InputLabelProps={{ shrink: true }}
            error={!!(endOutOfRange || endBeforeStart)}
            helperText={endOutOfRange ? `Must be before ${eventEnd?.toLocaleString()}` : endBeforeStart ? "Must be after start time" : ""}
            sx={{ mb: 2 }}
          />
          <MuiTextField label="Room" select fullWidth value={form.roomId} onChange={set("roomId")} sx={{ mb: 2 }}>
            {rooms?.map((r: any) => (
              <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
            ))}
          </MuiTextField>
          <MuiTextField
            label="Search speakers"
            fullWidth
            size="small"
            value={speakerSearch}
            onChange={(e) => setSpeakerSearch(e.target.value)}
            sx={{ mb: 1 }}
          />
          <MuiTextField label="Speakers" select fullWidth value={form.speakerIds} onChange={(e) => setForm((prev) => ({ ...prev, speakerIds: e.target.value as unknown as string[] }))} SelectProps={{ multiple: true }} sx={{ mb: 2 }}>
            {filteredSpeakers?.map((s: any) => (
              <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
            ))}
          </MuiTextField>
          <MuiTextField label="Capacity" type="number" fullWidth value={form.capacity} onChange={set("capacity")} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate} disabled={!form.title || !form.startTime || !form.endTime || !form.roomId || dateInvalid || isCreating}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
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
  });
  const listContext = useList({ data, isLoading: false, total: data?.length });

  if (!record) return null;
  if (isLoading) return <Loading />;

  return (
    <Box sx={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", bgcolor: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", overflow: "hidden" }}>
      <Box sx={{ p: 3, pb: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <EventIcon sx={{ color: "primary.main", fontSize: 20 }} />
          <Typography variant="subtitle1" fontWeight={700} color="#FAFDF6">
            Rooms ({data?.length ?? 0})
          </Typography>
        </Box>
        <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.06)" }} />
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
      </TabbedShowLayout>
    </Show>
  );
}

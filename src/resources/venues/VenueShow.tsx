import {
  Show,
  TextField,
  NumberField,
  Datagrid,
  TabbedShowLayout,
  Tab,
  useRecordContext,
  useGetManyReference,
  useCreate,
  ReferenceManyField,
  ListContextProvider,
  useList,
  type ShowProps,
  DateField,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
import { Loading } from "../../components/common/Loading";
import {
  Box,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
} from "@mui/material";
import { Room, Business, Add } from "@mui/icons-material";
import { useState } from "react";
import { VenueHero } from "../../components/venues/VenueHero";
import { VenueInfoBadge } from "../../components/venues/VenueInfoBadge";
import { buildMapQueryUrl } from "../../components/venues/constants";
import type { Venue } from "../../types";

function VenueTitle() {
  const record = useRecordContext<Venue>();
  if (!record) return null;
  return (
    <Typography variant="h5" fontWeight={700}>
      {record.name}
    </Typography>
  );
}

function DetailCards() {
  const record = useRecordContext<Venue>();
  if (!record) return null;
  const mapUrl = buildMapQueryUrl(
    record.name,
    record.neighborhood,
    record.city,
  );

  return (
    <Box>
      <VenueHero venue={record} mapUrl={mapUrl} />

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
          <LanguageIcon />
          <Typography variant="subtitle1" fontWeight={700} color="text.primary">
            Location Details
          </Typography>
        </Box>
        <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.06)" }} />
        <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          <VenueInfoBadge
            icon={
              <Room sx={{ fontSize: 18, color: "primary.main" }} />
            }
            label="City"
            value={record.city}
          />
          <VenueInfoBadge
            icon={
              <Business sx={{ fontSize: 18, color: "primary.main" }} />
            }
            label="Neighborhood"
            value={record.neighborhood}
          />
          <VenueInfoBadge
            icon={
              <Business sx={{ fontSize: 18, color: "primary.main" }} />
            }
            label="Total Rooms"
            value={String(record.totalRooms)}
          />
        </Box>
      </Box>
    </Box>
  );
}

function RoomsTab() {
  const venue = useRecordContext<Venue>();
  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");
  const [create, { isLoading: isCreating }] = useCreate();
  const { data: rooms, isLoading, refetch } = useGetManyReference("rooms", {
    target: "venueId",
    id: venue?.id,
    pagination: { page: 1, perPage: 50 },
    sort: { field: "name", order: "ASC" },
  });
  const listContext = useList({ data: rooms, isLoading: false, total: rooms?.length });

  const handleCreate = async () => {
    await create(
      "rooms",
      { data: { name: roomName, capacity: roomCapacity ? Number(roomCapacity) : undefined, venueId: venue?.id } },
      { onSuccess: () => { setOpen(false); setRoomName(""); setRoomCapacity(""); refetch(); } },
    );
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          New Room
        </Button>
      </Box>
      {isLoading ? <Loading /> : (
        <ListContextProvider value={listContext}>
          <Datagrid rowClick={(id) => `/rooms/${id}/show`} bulkActionButtons={false} sx={{ "& .RaDatagrid-rowCell": { py: 1.5 } }}>
            <TextField source="name" sx={{ fontWeight: 600 }} />
            <NumberField source="capacity" />
          </Datagrid>
        </ListContextProvider>
      )}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Room</DialogTitle>
        <DialogContent>
          <MuiTextField
            autoFocus
            label="Room Name"
            fullWidth
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            sx={{ mb: 2, mt: 1 }}
          />
          <MuiTextField
            label="Capacity"
            type="number"
            fullWidth
            value={roomCapacity}
            onChange={(e) => setRoomCapacity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={!roomName || isCreating}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function LanguageIcon() {
  const theme = useTheme();
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={theme.palette.primary.main}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export function VenueShow(props: ShowProps) {
  return (
    <Show {...props} title={<VenueTitle />}>
      <TabbedShowLayout>
        <Tab label="Details">
          <DetailCards />
        </Tab>

        <Tab label="Rooms" path="rooms">
          <RoomsTab />
        </Tab>

        <Tab label="Events" path="events">
          <ReferenceManyField reference="events" target="venueId">
            <Datagrid
              rowClick="show"
              bulkActionButtons={false}
              sx={{ "& .RaDatagrid-rowCell": { py: 1.5 } }}
            >
              <TextField source="title" sx={{ fontWeight: 600 }} />
              <DateField source="startDate" showTime />
              <DateField source="endDate" showTime />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}

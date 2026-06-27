import {
  Show,
  TextField,
  NumberField,
  ReferenceManyField,
  Datagrid,
  TabbedShowLayout,
  Tab,
  useRecordContext,
  type ShowProps,
  DateField,
} from "react-admin";
import { Box, Typography, Divider, Button } from "@mui/material";
import { Room, Business, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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
          bgcolor: "#2D2A32",
          p: 3,
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <LanguageIcon />
          <Typography variant="subtitle1" fontWeight={700} color="#FAFDF6">
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
  const navigate = useNavigate();
  const to = `/rooms/create?venueId=${encodeURIComponent(venue?.id ?? "")}`;
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={() => navigate(to)}
        >
          New Room
        </Button>
      </Box>
      <ReferenceManyField reference="rooms" target="venueId">
        <Datagrid
          rowClick="show"
          sx={{ "& .RaDatagrid-rowCell": { py: 1.5 } }}
        >
          <TextField source="name" sx={{ fontWeight: 600 }} />
          <NumberField source="capacity" />
        </Datagrid>
      </ReferenceManyField>
    </Box>
  );
}

function LanguageIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#DDD92A"
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

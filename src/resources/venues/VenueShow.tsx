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
import { Box, Typography } from "@mui/material";
import type { Venue } from "../../types";

function VenueTitle() {
  const record = useRecordContext<Venue>();
  if (!record) return null;
  return (
    <Typography variant="h5" fontWeight={600}>
      {record.name}
    </Typography>
  );
}

export function VenueShow(props: ShowProps) {
  return (
    <Show {...props} title={<VenueTitle />}>
      <TabbedShowLayout>
        <Tab label="Details">
          <Box display="flex" gap={4} flexWrap="wrap">
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Venue Name
              </Typography>
              <TextField source="name" />
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                City
              </Typography>
              <TextField source="city" />
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Neighborhood
              </Typography>
              <TextField source="neighborhood" />
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Total Rooms
              </Typography>
              <NumberField source="totalRooms" />
            </Box>
          </Box>
        </Tab>

        <Tab label="Rooms" path="rooms">
          <ReferenceManyField reference="rooms" target="venueId" label="Rooms">
            <Datagrid rowClick="show">
              <TextField source="name" />
              <NumberField source="capacity" />
            </Datagrid>
          </ReferenceManyField>
        </Tab>

        <Tab label="Events" path="events">
          <ReferenceManyField
            reference="events"
            target="venueId"
            label="Events"
          >
            <Datagrid rowClick="show">
              <TextField source="title" />
              <DateField source="startDate" label="Start" showTime />
              <DateField source="endDate" label="End" showTime />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}

import {
  Show,
  TextField,
  NumberField,
  ReferenceField,
  ReferenceManyField,
  Datagrid,
  DateField,
  TabbedShowLayout,
  Tab,
  useRecordContext,
  type ShowProps,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import type { Room } from "../../types";

function RoomTitle() {
  const record = useRecordContext<Room>();
  if (!record) return null;
  return (
    <Typography variant="h5" fontWeight={600}>
      {record.name}
    </Typography>
  );
}

export function RoomShow(props: ShowProps) {
  return (
    <Show {...props} title={<RoomTitle />}>
      <TabbedShowLayout>
        <Tab label="Details">
          <Box display="flex" gap={4} flexWrap="wrap">
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Room Name
              </Typography>
              <TextField source="name" />
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Capacity
              </Typography>
              <NumberField source="capacity" />
            </Box>
          </Box>

          <Box mt={3}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Venue
            </Typography>
            <ReferenceField source="venueId" reference="venues" link="show">
              <TextField source="name" />
            </ReferenceField>
          </Box>
        </Tab>

        <Tab label="Sessions" path="sessions">
          <ReferenceManyField
            reference="sessions"
            target="roomId"
            label="Sessions"
          >
            <Datagrid rowClick="show">
              <TextField source="title" />
              <DateField source="startTime" label="Start" showTime />
              <DateField source="endTime" label="End" showTime />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}

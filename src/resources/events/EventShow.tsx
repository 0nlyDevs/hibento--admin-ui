import {
  Show,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
  Datagrid,
  NumberField,
  TabbedShowLayout,
  Tab,
  useRecordContext,
  useGetList,
  useGetManyReference,
  Loading,
  type ShowProps,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import { StatusBadge } from "../../components/common/StatusBadge";
import { getEventStatus } from "../../utils";
import type { Event } from "../../types";

function EventTitle() {
  const record = useRecordContext<Event>();
  if (!record) return null;
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography variant="h5" fontWeight={600}>
        {record.title}
      </Typography>
      <StatusBadge
        status={getEventStatus(record.startDate, record.endDate)}
        size="medium"
      />
    </Box>
  );
}

function SessionsTab() {
  const record = useRecordContext<Event>();
  const { data, isLoading } = useGetList("sessions", {
    filter: { eventId: record?.id },
    pagination: { page: 1, perPage: 100 },
    sort: { field: "startTime", order: "ASC" },
  });

  if (!record) return null;
  if (isLoading) return <Loading />;

  return (
    <Datagrid data={data}>
      <TextField source="title" />
      <TextField source="roomName" label="Room" />
      <DateField source="startTime" label="Start" showTime />
      <DateField source="endTime" label="End" showTime />
      <NumberField source="capacity" />
    </Datagrid>
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

  if (!record) return null;
  if (isLoading) return <Loading />;

  return (
    <Datagrid data={data}>
      <TextField source="name" />
      <NumberField source="capacity" />
    </Datagrid>
  );
}

export function EventShow(props: ShowProps) {
  return (
    <Show {...props} title={<EventTitle />}>
      <TabbedShowLayout>
        <Tab label="Details">
          <Box display="flex" gap={2} flexWrap="wrap">
            <Box flex={1} minWidth={280}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Description
              </Typography>
              <TextField source="description" />
            </Box>
          </Box>

          <Box display="flex" gap={4} mt={3} flexWrap="wrap">
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Start Date
              </Typography>
              <DateField source="startDate" showTime />
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                End Date
              </Typography>
              <DateField source="endDate" showTime />
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Online
              </Typography>
              <BooleanField source="online" />
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
          <SessionsTab />
        </Tab>

        <Tab label="Rooms" path="rooms">
          <RoomsTab />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}

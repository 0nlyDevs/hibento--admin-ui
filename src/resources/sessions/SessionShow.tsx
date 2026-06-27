import {
  Show,
  TextField,
  DateField,
  ReferenceField,
  NumberField,
  ArrayField,
  ChipField,
  SingleFieldList,
  TabbedShowLayout,
  Tab,
  useRecordContext,
  type ShowProps,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import { LiveBadge } from "../../components/common/StatusBadge";
import { isSessionLive } from "../../utils";
import type { Session } from "../../types";

function SessionTitle() {
  const record = useRecordContext<Session>();
  if (!record) return null;
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography variant="h5" fontWeight={600}>
        {record.title}
      </Typography>
      <LiveBadge isLive={isSessionLive(record.startTime, record.endTime)} />
    </Box>
  );
}

export function SessionShow(props: ShowProps) {
  return (
    <Show {...props} title={<SessionTitle />}>
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
                Start Time
              </Typography>
              <DateField source="startTime" showTime />
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                End Time
              </Typography>
              <DateField source="endTime" showTime />
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Room
              </Typography>
              <ReferenceField source="roomId" reference="rooms" link="show">
                <TextField source="name" />
              </ReferenceField>
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
              Event
            </Typography>
            <ReferenceField source="eventId" reference="events" link="show">
              <TextField source="title" />
            </ReferenceField>
          </Box>
        </Tab>

        <Tab label="Speakers" path="speakers">
          <ArrayField source="speakerIds">
            <SingleFieldList linkType="show">
              <ReferenceField source="" reference="speakers" link="show">
                <ChipField source="name" />
              </ReferenceField>
            </SingleFieldList>
          </ArrayField>

          <ReferenceField source="eventId" reference="events" link="show">
            <ReferenceField reference="sessions" source="eventId" link={false}>
              <ArrayField source="speakerIds">
                <SingleFieldList>
                  <ReferenceField source="" reference="speakers" link="show">
                    <TextField source="name" />
                  </ReferenceField>
                </SingleFieldList>
              </ArrayField>
            </ReferenceField>
          </ReferenceField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}

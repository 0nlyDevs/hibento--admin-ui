import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  NumberField,
  SearchInput,
  TextInput,
  ShowButton,
  EditButton,
  TopToolbar,
  CreateButton,
  useRecordContext,
  type ListProps,
} from "react-admin";
import { Box } from "@mui/material";
import { LiveBadge } from "../../components/common/StatusBadge";
import { isSessionLive } from "../../utils";
import type { Session } from "../../types";

const sessionFilters = [
  <SearchInput source="q" alwaysOn key="search" />,
  <TextInput source="title" label="Title" key="title" />,
];

function LiveStatusField() {
  const record = useRecordContext<Session>();
  if (!record) return null;
  const live = isSessionLive(record.startTime, record.endTime);
  return <LiveBadge isLive={live} />;
}

export function SessionList(props: ListProps) {
  return (
    <List
      {...props}
      filters={sessionFilters}
      sort={{ field: "startTime", order: "DESC" }}
      actions={
        <TopToolbar>
          <CreateButton />
        </TopToolbar>
      }
    >
      <Datagrid rowClick="show">
        <TextField source="title" label="Title" sx={{ fontWeight: 600 }} />
        <ReferenceField
          source="eventId"
          reference="events"
          label="Event"
          link="show"
        >
          <TextField source="title" />
        </ReferenceField>
        <TextField source="roomName" label="Room" />
        <DateField source="startTime" label="Start" showTime locales="en-US" />
        <DateField source="endTime" label="End" showTime locales="en-US" />
        <LiveStatusField label="Status" />
        <NumberField source="capacity" />
        <Box component="td" sx={{ textAlign: "right" }}>
          <EditButton />
          <ShowButton />
        </Box>
      </Datagrid>
    </List>
  );
}

import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
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
import { StatusBadge } from "../../components/common/StatusBadge";
import { getEventStatus } from "../../utils";

const eventFilters = [
  <SearchInput source="q" alwaysOn key="search" />,
  <TextInput source="title" label="Title" key="title" />,
];

function StatusField() {
  const record = useRecordContext<{ startDate: string; endDate: string }>();
  if (!record) return null;
  const status = getEventStatus(record.startDate, record.endDate);
  return <StatusBadge status={status} />;
}

export function EventList(props: ListProps) {
  return (
    <List
      {...props}
      filters={eventFilters}
      sort={{ field: "startDate", order: "DESC" }}
      actions={
        <TopToolbar>
          <CreateButton />
        </TopToolbar>
      }
    >
      <Datagrid rowClick="show">
        <TextField source="title" label="Name" sx={{ fontWeight: 600 }} />
        <ReferenceField
          source="venueId"
          reference="venues"
          label="Venue"
          link={false}
        >
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          source="venueId"
          reference="venues"
          label="City"
          link={false}
        >
          <TextField source="city" />
        </ReferenceField>
        <DateField
          source="startDate"
          label="Start Date"
          showTime={false}
          locales="en-US"
        />
        <DateField
          source="endDate"
          label="End Date"
          showTime={false}
          locales="en-US"
        />
        <StatusField label="Status" />
        <Box component="td" sx={{ textAlign: "right" }}>
          <EditButton />
          <ShowButton />
        </Box>
      </Datagrid>
    </List>
  );
}

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
  FunctionField,
  type ListProps,
} from "react-admin";
import { LiveBadge } from "../../components/common/StatusBadge";
import { isSessionLive } from "../../utils";

const sessionFilters = [
  <SearchInput source="q" alwaysOn key="search" />,
  <TextInput source="title" label="Title" key="title" />,
];

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
      <Datagrid rowClick="show" bulkActionButtons={false}>
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
        <FunctionField
          label="Status"
          render={(record) => (
            <LiveBadge
              isLive={isSessionLive(record.startTime, record.endTime)}
            />
          )}
        />
        <NumberField source="capacity" />
        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>
  );
}

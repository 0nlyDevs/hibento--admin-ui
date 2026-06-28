import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
  SearchInput,
  TextInput,
  ShowButton,
  EditButton,
  TopToolbar,
  CreateButton,
  type ListProps,
} from "react-admin";
const roomFilters = [
  <SearchInput source="q" alwaysOn key="search" />,
  <TextInput source="name" label="Name" key="name" />,
];

export function RoomList(props: ListProps) {
  return (
    <List
      {...props}
      filters={roomFilters}
      sort={{ field: "name", order: "ASC" }}
      actions={
        <TopToolbar>
          <CreateButton />
        </TopToolbar>
      }
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" sx={{ fontWeight: 600 }} />
        <ReferenceField
          source="venueId"
          reference="venues"
          label="Venue"
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <NumberField source="capacity" />
        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>
  );
}

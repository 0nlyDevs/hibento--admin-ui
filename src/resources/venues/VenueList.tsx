import {
  List,
  Datagrid,
  TextField,
  NumberField,
  SearchInput,
  TextInput,
  ShowButton,
  EditButton,
  TopToolbar,
  CreateButton,
  type ListProps,
} from "react-admin";
import { Box } from "@mui/material";

const venueFilters = [
  <SearchInput source="q" alwaysOn key="search" />,
  <TextInput source="name" label="Name" key="name" />,
  <TextInput source="city" label="City" key="city" />,
];

export function VenueList(props: ListProps) {
  return (
    <List
      {...props}
      filters={venueFilters}
      sort={{ field: "name", order: "ASC" }}
      actions={
        <TopToolbar>
          <CreateButton />
        </TopToolbar>
      }
    >
      <Datagrid rowClick="show">
        <TextField source="name" sx={{ fontWeight: 600 }} />
        <TextField source="city" />
        <TextField source="neighborhood" label="Neighborhood" />
        <NumberField source="totalRooms" label="Rooms" />
        <Box component="td" sx={{ textAlign: "right" }}>
          <EditButton />
          <ShowButton />
        </Box>
      </Datagrid>
    </List>
  );
}

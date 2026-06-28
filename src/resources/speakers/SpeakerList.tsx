import {
  List,
  Datagrid,
  TextField,
  SearchInput,
  TextInput,
  ShowButton,
  EditButton,
  TopToolbar,
  CreateButton,
  FunctionField,
  type ListProps,
} from "react-admin";
import { Avatar } from "@mui/material";

const speakerFilters = [
  <SearchInput source="q" alwaysOn key="search" />,
  <TextInput source="name" label="Name" key="name" />,
];

export function SpeakerList(props: ListProps) {
  return (
    <List
      {...props}
      filters={speakerFilters}
      sort={{ field: "name", order: "ASC" }}
      actions={
        <TopToolbar>
          <CreateButton />
        </TopToolbar>
      }
    >
      <Datagrid rowClick="show">
        <FunctionField
          label=""
          render={(record) => (
            <Avatar
              src={record.avatarUrl || undefined}
              alt={record.name}
              sx={{ width: 36, height: 36 }}
            >
              {record.name?.charAt(0)?.toUpperCase()}
            </Avatar>
          )}
        />
        <TextField source="name" sx={{ fontWeight: 600 }} />
        <TextField source="bio" label="Bio" />
        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>
  );
}

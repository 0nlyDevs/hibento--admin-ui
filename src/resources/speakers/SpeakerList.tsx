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
  useRecordContext,
  type ListProps,
} from "react-admin";
import { Avatar, Box } from "@mui/material";
import type { Speaker } from "../../types";

function AvatarField() {
  const record = useRecordContext<Speaker>();
  if (!record) return null;
  return (
    <Avatar
      src={record.avatarUrl || undefined}
      alt={record.name}
      sx={{ width: 36, height: 36 }}
    >
      {record.name?.charAt(0)?.toUpperCase()}
    </Avatar>
  );
}

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
        <AvatarField label="" />
        <TextField source="name" sx={{ fontWeight: 600 }} />
        <TextField source="bio" label="Bio" />
        <Box component="td" sx={{ textAlign: "right" }}>
          <EditButton />
          <ShowButton />
        </Box>
      </Datagrid>
    </List>
  );
}

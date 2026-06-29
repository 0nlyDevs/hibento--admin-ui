import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  SearchInput,
  TextInput,
  ShowButton,
  TopToolbar,
  CreateButton,
  type ListProps,
} from "react-admin";

const questionFilters = [
  <SearchInput source="q" alwaysOn key="search" />,
  <TextInput source="eventSessionId" label="Session ID" key="session" />,
];

export function QuestionList(props: ListProps) {
  return (
    <List
      {...props}
      filters={questionFilters}
      sort={{ field: "upvotes", order: "DESC" }}
      actions={
        <TopToolbar>
          <CreateButton />
        </TopToolbar>
      }
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="content" label="Question" sx={{ fontWeight: 600, maxWidth: 300 }} />
        <TextField source="authorName" label="Author" />
        <NumberField source="upvotes" label="Upvotes" />
        <DateField source="createdAt" label="Submitted" showTime locales="en-US" />
        <ShowButton />
      </Datagrid>
    </List>
  );
}

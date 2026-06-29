import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  ReferenceInput,
  AutocompleteInput,
  ReferenceArrayInput,
  NumberInput,
  required,
  maxLength,
  minValue,
  useGetOne,
  useGetList,
  SelectInput,
  type CreateProps,
} from "react-admin";
import { useWatch } from "react-hook-form";
import { FormSection } from "../../components/forms/FormSection";
import { useLocation } from "react-router-dom";

function RoomInput() {
  const eventId = useWatch({ name: "eventId" });
  const { data: eventData } = useGetOne("events", { id: eventId }, { enabled: !!eventId });
  const isOnline = (eventData as any)?.online;
  const venueId = (eventData as any)?.venueId;

  if (isOnline) return null;

  const { data: rooms } = useGetList("rooms", {
    filter: venueId ? { venueId } as any : {},
    pagination: { page: 1, perPage: 100 },
    sort: { field: "name", order: "ASC" },
  }, { enabled: !!venueId });

  return (
    <SelectInput
      source="roomId"
      label="Room"
      fullWidth
      choices={rooms?.map((r: any) => ({ id: r.id, name: r.name })) || []}
      validate={required()}
    />
  );
}

export function SessionCreate(props: CreateProps) {
  const location = useLocation();
  const preFilledEventId = (location.state as any)?.record?.eventId;

  return (
    <Create {...props} redirect="show">
      <SimpleForm defaultValues={preFilledEventId ? { eventId: preFilledEventId } : undefined}>
        <FormSection title="Event" description="Select the event for this session">
          <ReferenceInput source="eventId" reference="events">
            <AutocompleteInput
              label="Event"
              fullWidth
              optionText="title"
              validate={required()}
            />
          </ReferenceInput>
        </FormSection>

        <FormSection title="Session Details" description="Core session information">
          <TextInput source="title" label="Title" fullWidth validate={[required(), maxLength(255)]} />
          <TextInput source="description" label="Description" fullWidth multiline rows={4} />
        </FormSection>

        <FormSection title="Scheduling">
          <DateTimeInput source="startTime" label="Start Time" fullWidth validate={required()} parse={(v: string) => v ? new Date(v).toISOString() : v} />
          <DateTimeInput source="endTime" label="End Time" fullWidth validate={required()} parse={(v: string) => v ? new Date(v).toISOString() : v} />
          <RoomInput />
        </FormSection>

        <FormSection title="Speakers">
          <ReferenceArrayInput source="speakerIds" reference="speakers" label="Speakers">
            <AutocompleteInput label="Assign Speakers" fullWidth multiple optionText="name" />
          </ReferenceArrayInput>
          <NumberInput source="capacity" label="Capacity" fullWidth validate={minValue(0)} helperText="Maximum number of attendees" />
        </FormSection>
      </SimpleForm>
    </Create>
  );
}

import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  ReferenceArrayInput,
  AutocompleteInput,
  NumberInput,
  required,
  maxLength,
  minValue,
  useGetOne,
  useGetManyReference,
  SelectInput,
  type CreateProps,
} from "react-admin";
import { Box, Typography, Chip } from "@mui/material";
import { Event, Room } from "@mui/icons-material";
import { FormSection } from "../../components/forms/FormSection";
import { useLocation } from "react-router-dom";

function Header({ eventId }: { eventId: string }) {
  const { data: eventData } = useGetOne("events", { id: eventId });
  const { data: venueData } = useGetOne("venues", { id: eventData?.venueId }, { enabled: !!eventData?.venueId });

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2, p: 2, bgcolor: "rgba(255,255,255,0.03)", borderRadius: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Event sx={{ fontSize: 18, color: "primary.main" }} />
        <Typography variant="body2" color="text.secondary">Event:</Typography>
        <Chip label={eventData?.title || eventId} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
      </Box>
      {venueData && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Room sx={{ fontSize: 18, color: "primary.main" }} />
          <Typography variant="body2" color="text.secondary">Venue:</Typography>
          <Chip label={venueData.name} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
        </Box>
      )}
    </Box>
  );
}

export function SessionCreate(props: CreateProps) {
  const location = useLocation();
  const preFilledEventId = (location.state as any)?.record?.eventId;
  const { data: eventData } = useGetOne("events", { id: preFilledEventId }, { enabled: !!preFilledEventId });
  const { data: rooms } = useGetManyReference("rooms", {
    target: "venueId",
    id: eventData?.venueId,
    pagination: { page: 1, perPage: 50 },
    sort: { field: "name", order: "ASC" },
  }, { enabled: !!eventData?.venueId });

  return (
    <Create {...props} redirect="show">
      <SimpleForm>
        {preFilledEventId && <Header eventId={preFilledEventId} />}

        <FormSection title="Session Details" description="Core session information">
          <TextInput source="title" label="Title" fullWidth validate={[required(), maxLength(255)]} />
          <TextInput source="description" label="Description" fullWidth multiline rows={4} />
        </FormSection>

        <FormSection title="Scheduling">
          <DateTimeInput source="startTime" label="Start Time" fullWidth validate={required()} parse={(v: string) => v ? new Date(v).toISOString() : v} />
          <DateTimeInput source="endTime" label="End Time" fullWidth validate={required()} parse={(v: string) => v ? new Date(v).toISOString() : v} />
          <SelectInput
            source="roomId"
            label="Room"
            fullWidth
            choices={rooms?.map((r: any) => ({ id: r.id, name: r.name })) || []}
            validate={required()}
          />
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

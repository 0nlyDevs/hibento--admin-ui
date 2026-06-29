import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  BooleanInput,
  ReferenceInput,
  AutocompleteInput,
  required,
  maxLength,
  type CreateProps,
} from "react-admin";
import { useWatch } from "react-hook-form";
import { FormSection } from "../../components/forms/FormSection";

function VenueInput() {
  const online = useWatch({ name: "online" });
  if (online) return null;
  return (
    <FormSection title="Location">
      <ReferenceInput source="venueId" reference="venues">
        <AutocompleteInput label="Venue" fullWidth />
      </ReferenceInput>
    </FormSection>
  );
}

export function EventCreate(props: CreateProps) {
  return (
    <Create {...props} redirect="show">
      <SimpleForm>
        <FormSection
          title="Basic Information"
          description="Core details about the event"
        >
          <TextInput
            source="title"
            label="Name"
            fullWidth
            validate={[required(), maxLength(255)]}
          />
          <TextInput
            source="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
          />
          <BooleanInput source="online" label="Online Event" />
        </FormSection>

        <VenueInput />

        <FormSection title="Schedule">
          <DateTimeInput
            source="startDate"
            label="Start Date"
            fullWidth
            validate={required()}
            defaultValue={new Date().toISOString()}
            parse={(value: string) => (value ? new Date(value).toISOString() : value)}
          />
          <DateTimeInput
            source="endDate"
            label="End Date"
            fullWidth
            validate={required()}
            parse={(value: string) => (value ? new Date(value).toISOString() : value)}
          />
        </FormSection>
      </SimpleForm>
    </Create>
  );
}

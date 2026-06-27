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
import { FormSection } from "../../components/forms/FormSection";

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

        <FormSection title="Location">
          <ReferenceInput source="venueId" reference="venues">
            <AutocompleteInput label="Venue" fullWidth />
          </ReferenceInput>
        </FormSection>

        <FormSection title="Schedule">
          <DateTimeInput
            source="startDate"
            label="Start Date"
            fullWidth
            validate={required()}
            defaultValue={new Date().toISOString()}
          />
          <DateTimeInput
            source="endDate"
            label="End Date"
            fullWidth
            validate={required()}
          />
        </FormSection>
      </SimpleForm>
    </Create>
  );
}

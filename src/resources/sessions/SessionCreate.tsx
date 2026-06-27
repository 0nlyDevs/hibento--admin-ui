import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  ReferenceInput,
  AutocompleteInput,
  NumberInput,
  required,
  maxLength,
  minValue,
  type CreateProps,
} from "react-admin";
import { FormSection } from "../../components/forms/FormSection";

export function SessionCreate(props: CreateProps) {
  return (
    <Create {...props} redirect="show">
      <SimpleForm>
        <FormSection
          title="Session Details"
          description="Core session information"
        >
          <TextInput
            source="title"
            label="Title"
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
        </FormSection>

        <FormSection title="Scheduling">
          <ReferenceInput source="eventId" reference="events">
            <AutocompleteInput label="Event" fullWidth validate={required()} />
          </ReferenceInput>
          <ReferenceInput source="roomId" reference="rooms">
            <AutocompleteInput label="Room" fullWidth validate={required()} />
          </ReferenceInput>
          <DateTimeInput
            source="startTime"
            label="Start Time"
            fullWidth
            validate={required()}
          />
          <DateTimeInput
            source="endTime"
            label="End Time"
            fullWidth
            validate={required()}
          />
        </FormSection>

        <FormSection title="Speakers">
          <ReferenceInput
            source="speakerIds"
            reference="speakers"
            label="Speakers"
          >
            <AutocompleteInput
              label="Assign Speakers"
              fullWidth
              multiple
              optionText="name"
            />
          </ReferenceInput>
          <NumberInput
            source="capacity"
            label="Capacity"
            fullWidth
            validate={minValue(0)}
            helperText="Maximum number of attendees"
          />
        </FormSection>
      </SimpleForm>
    </Create>
  );
}

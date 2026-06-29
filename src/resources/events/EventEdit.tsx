import { useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateTimeInput,
  BooleanInput,
  ReferenceInput,
  AutocompleteInput,
  useGetOne,
  required,
  maxLength,
  type EditProps,
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

export function EventEdit(props: EditProps) {
  const { id } = useParams();
  const { data: record } = useGetOne("events", { id });

  const transform = useCallback(
    (data: Record<string, unknown>) => ({
      title: data.title,
      description: data.description,
      online: record?.online,
      startDate: record?.startDate,
      endDate: record?.endDate,
      venueId: record?.venueId,
    }),
    [record],
  );

  return (
    <Edit {...props} redirect="show" transform={transform}>
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
          <BooleanInput source="online" label="Online Event" disabled helperText="Cannot be changed after creation" />
        </FormSection>

        <VenueInput />

        <FormSection title="Schedule">
          <DateTimeInput
            source="startDate"
            label="Start Date"
            fullWidth
            disabled
            helperText="Cannot be changed after creation"
            parse={(value: string) => (value ? new Date(value).toISOString() : value)}
          />
          <DateTimeInput
            source="endDate"
            label="End Date"
            fullWidth
            disabled
            helperText="Cannot be changed after creation"
            parse={(value: string) => (value ? new Date(value).toISOString() : value)}
          />
        </FormSection>
      </SimpleForm>
    </Edit>
  );
}

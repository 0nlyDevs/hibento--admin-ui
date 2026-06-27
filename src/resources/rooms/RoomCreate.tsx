import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  AutocompleteInput,
  required,
  maxLength,
  minValue,
  type CreateProps,
} from "react-admin";
import { useSearchParams } from "react-router-dom";
import { FormSection } from "../../components/forms/FormSection";

export function RoomCreate(props: CreateProps) {
  const [searchParams] = useSearchParams();
  const venueId = searchParams.get("venueId") || undefined;

  return (
    <Create {...props} redirect="show" defaultValues={{ venueId }}>
      <SimpleForm>
        <FormSection title="Room Information">
          <TextInput
            source="name"
            label="Room Name"
            fullWidth
            validate={[required(), maxLength(100)]}
          />
          <ReferenceInput source="venueId" reference="venues">
            <AutocompleteInput label="Venue" fullWidth validate={required()} />
          </ReferenceInput>
          <NumberInput
            source="capacity"
            label="Capacity"
            fullWidth
            validate={minValue(1)}
            helperText="Maximum number of people"
          />
        </FormSection>
      </SimpleForm>
    </Create>
  );
}

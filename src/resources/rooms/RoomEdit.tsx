import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  AutocompleteInput,
  required,
  maxLength,
  minValue,
  type EditProps,
} from "react-admin";
import { FormSection } from "../../components/forms/FormSection";

export function RoomEdit(props: EditProps) {
  return (
    <Edit {...props} redirect="show">
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
    </Edit>
  );
}

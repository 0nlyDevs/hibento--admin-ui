import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  maxLength,
  minValue,
  type EditProps,
} from "react-admin";
import { FormSection } from "../../components/forms/FormSection";

export function VenueEdit(props: EditProps) {
  return (
    <Edit {...props} redirect="show">
      <SimpleForm>
        <FormSection title="Venue Information">
          <TextInput
            source="name"
            label="Venue Name"
            fullWidth
            validate={[required(), maxLength(255)]}
          />
          <TextInput
            source="city"
            label="City"
            fullWidth
            validate={[required(), maxLength(255)]}
          />
          <TextInput
            source="neighborhood"
            label="Neighborhood"
            fullWidth
            validate={[required(), maxLength(255)]}
          />
        </FormSection>

        <FormSection title="Capacity Information">
          <NumberInput
            source="totalRooms"
            label="Total Rooms"
            fullWidth
            validate={[required(), minValue(1)]}
            helperText="Number of rooms in this venue"
          />
        </FormSection>
      </SimpleForm>
    </Edit>
  );
}

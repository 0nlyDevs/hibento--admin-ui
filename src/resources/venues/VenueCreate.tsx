import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  maxLength,
  minValue,
  type CreateProps,
} from "react-admin";
import { FormSection } from "../../components/forms/FormSection";

export function VenueCreate(props: CreateProps) {
  return (
    <Create {...props} redirect="show">
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
    </Create>
  );
}

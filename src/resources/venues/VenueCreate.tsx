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
import { Box, Typography } from "@mui/material";
import { Room } from "@mui/icons-material";
import { FormSection } from "../../components/forms/FormSection";

export function VenueCreate(props: CreateProps) {
  return (
    <Create {...props} redirect="show">
      <SimpleForm>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Room sx={{ color: "primary.main" }} />
          <Typography variant="h6" fontWeight={700}>
            New Venue
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Add a new venue to the platform
        </Typography>

        <FormSection title="Venue Information">
          <TextInput
            source="name"
            label="Venue Name"
            fullWidth
            validate={[required(), maxLength(255)]}
            helperText="The official name of the venue"
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
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
          </Box>
        </FormSection>

        <FormSection
          title="Capacity Information"
          description="How many rooms does this venue have?"
        >
          <NumberInput
            source="totalRooms"
            label="Total Rooms"
            fullWidth
            validate={[required(), minValue(1)]}
            helperText="Number of rooms in this venue"
            sx={{ maxWidth: 300 }}
          />
        </FormSection>
      </SimpleForm>
    </Create>
  );
}

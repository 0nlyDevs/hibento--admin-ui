import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  maxLength,
  type EditProps,
} from "react-admin";
import { FormSection } from "../../components/forms/FormSection";
import { SocialLinksInput } from "../../components/forms/SocialLinksInput";

export function SpeakerEdit(props: EditProps) {
  return (
    <Edit {...props} redirect="show">
      <SimpleForm>
        <FormSection title="Profile" description="Personal information">
          <TextInput
            source="name"
            label="Full Name"
            fullWidth
            validate={[required(), maxLength(255)]}
          />
          <TextInput source="bio" label="Bio" fullWidth multiline rows={4} />
          <TextInput
            source="avatarUrl"
            label="Avatar URL"
            fullWidth
            helperText="Link to speaker's profile image"
          />
        </FormSection>

        <FormSection
          title="Social Links"
          description="Connect social media profiles"
        >
          <SocialLinksInput />
        </FormSection>
      </SimpleForm>
    </Edit>
  );
}

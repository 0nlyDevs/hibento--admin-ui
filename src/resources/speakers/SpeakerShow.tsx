import {
  Show,
  ArrayField,
  ChipField,
  SingleFieldList,
  TabbedShowLayout,
  Tab,
  useRecordContext,
  type ShowProps,
} from "react-admin";
import { Box, Typography, Avatar, Chip } from "@mui/material";
import type { Speaker, ExternalLink } from "../../types";

function SpeakerLayout() {
  const record = useRecordContext<Speaker>();
  if (!record) return null;

  return (
    <Box display="flex" gap={4} flexWrap="wrap">
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Avatar
          src={record.avatarUrl || undefined}
          alt={record.name}
          sx={{ width: 96, height: 96, fontSize: 36 }}
        >
          {record.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography variant="h5" fontWeight={600}>
          {record.name}
        </Typography>
      </Box>

      <Box flex={1} minWidth={280}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Bio
        </Typography>
        <Typography variant="body1" color="text.primary">
          {record.bio || "No bio provided"}
        </Typography>

        {record.externalLinks && record.externalLinks.length > 0 && (
          <Box mt={3}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Social Links
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {record.externalLinks.map((link: ExternalLink, index: number) => (
                <Chip
                  key={index}
                  label={`${link.type}: ${link.url}`}
                  size="small"
                  variant="outlined"
                  onClick={() => window.open(link.url, "_blank")}
                  sx={{ cursor: "pointer" }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export function SpeakerShow(props: ShowProps) {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Profile">
          <SpeakerLayout />
        </Tab>

        <Tab label="Sessions" path="sessions">
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Sessions
          </Typography>
          <ArrayField source="speakerIds">
            <SingleFieldList>
              <ChipField source="id" />
            </SingleFieldList>
          </ArrayField>
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              Sessions assigned to this speaker are managed from the Session
              editor.
            </Typography>
          </Box>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}

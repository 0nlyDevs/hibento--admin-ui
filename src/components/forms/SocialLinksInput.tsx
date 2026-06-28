import {
  Box,
  Button,
  IconButton,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useFormContext, useWatch } from "react-hook-form";
import { useRef, useEffect } from "react";
import { EXTERNAL_LINK_TYPES } from "../../utils";

interface SocialLink {
  type: string;
  url: string;
}

export function SocialLinksInput() {
  const { setValue, control } = useFormContext();
  const rawLinks = useWatch({ control, name: "externalLinks" });
  const links: SocialLink[] = rawLinks ?? [];
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (!rawLinks || rawLinks.length === 0) {
        setValue("externalLinks", []);
      }
    }
  }, [rawLinks, setValue]);

  const addLink = () => {
    setValue("externalLinks", [...(links || []), { type: "github", url: "" }], {
      shouldDirty: true,
    });
  };

  const removeLink = (index: number) => {
    const updated = links.filter((_: SocialLink, i: number) => i !== index);
    setValue("externalLinks", updated, { shouldDirty: true });
  };

  const updateLink = (
    index: number,
    field: keyof SocialLink,
    value: string,
  ) => {
    const updated = links.map((link: SocialLink, i: number) =>
      i === index ? { ...link, [field]: value } : link,
    );
    setValue("externalLinks", updated, { shouldDirty: true });
  };

  return (
    <Box>
      {(links || []).map((link: SocialLink, index: number) => (
        <Box
          key={index}
          display="flex"
          gap={1.5}
          alignItems="flex-start"
          mb={1.5}
        >
          <Select
            size="small"
            value={link.type}
            onChange={(e) => updateLink(index, "type", e.target.value)}
            sx={{ minWidth: 140 }}
          >
            {EXTERNAL_LINK_TYPES.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            size="small"
            placeholder="https://"
            value={link.url}
            onChange={(e) => updateLink(index, "url", e.target.value)}
            sx={{ flex: 1 }}
          />
          <IconButton
            size="small"
            onClick={() => removeLink(index)}
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
      <Button
        startIcon={<AddIcon />}
        onClick={addLink}
        size="small"
        variant="outlined"
        sx={{ mt: 0.5 }}
      >
        Add Link
      </Button>
      <FormHelperText>
        GitHub, LinkedIn, Twitter/X, Website, etc.
      </FormHelperText>
    </Box>
  );
}

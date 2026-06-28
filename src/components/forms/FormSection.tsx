import { Box, Typography, Divider } from "@mui/material";
import type { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <Box mb={4}>
      <Box mb={2}>
        <Typography variant="h6" color="text.primary" fontWeight={600}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {description}
          </Typography>
        )}
        <Divider sx={{ mt: 1 }} />
      </Box>
      <Box pl={0.5}>{children}</Box>
    </Box>
  );
}

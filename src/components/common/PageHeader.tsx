import { Typography, Box } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="space-between"
      mb={4}
      flexWrap="wrap"
      gap={2}
    >
      <Box>
        <Typography variant="h4" color="text.primary" fontWeight={700}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actions && <Box>{actions}</Box>}
    </Box>
  );
}

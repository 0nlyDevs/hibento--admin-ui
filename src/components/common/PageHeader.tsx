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
      mb={5}
      flexWrap="wrap"
      gap={2}
    >
      <Box>
        <Typography
          sx={{
            fontFamily: '"Geist", "Manrope", monospace',
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "#ddd92a",
            mb: 1.5,
          }}
        >
          § {title.toUpperCase()}
        </Typography>
        <Typography variant="h4" color="text.primary" fontWeight={700}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" mt={1}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actions && <Box>{actions}</Box>}
    </Box>
  );
}

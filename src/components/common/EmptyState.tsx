import { Box, Typography } from "@mui/material";

interface EmptyStateProps {
  message: string;
  action?: React.ReactNode;
}

export function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={6}
      px={4}
      textAlign="center"
    >
      <Typography
        sx={{
          fontFamily: '"Geist", "Manrope", monospace',
          fontSize: "0.7rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 500,
          color: "primary.main",
          mb: 1.5,
        }}
      >
        § EMPTY
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        fontWeight={400}
        sx={{ opacity: 0.7 }}
      >
        {message}
      </Typography>
      {action && <Box mt={2}>{action}</Box>}
    </Box>
  );
}

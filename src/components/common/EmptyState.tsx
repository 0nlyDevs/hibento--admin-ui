import { Box, Typography, Button } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  actionPath?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  message,
  actionLabel,
  actionPath,
  icon,
}: EmptyStateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={8}
      px={4}
      textAlign="center"
    >
      <Box color="action.disabled" mb={2}>
        {icon || <InboxIcon sx={{ fontSize: 56 }} />}
      </Box>
      <Typography variant="h6" color="text.secondary" mb={1}>
        {message}
      </Typography>
      {actionLabel && actionPath && (
        <Button
          component={Link}
          to={actionPath}
          variant="contained"
          size="small"
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}

import { useState } from "react";
import { useLogin } from "react-admin";
import { Box, Button, Card, Typography, useTheme } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  const theme = useTheme();

  const handleLogin = () => {
    setLoading(true);
    login({});
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
      }}
    >
      <Card
        sx={{
          p: 6,
          maxWidth: 420,
          width: "100%",
          mx: 2,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            bgcolor: theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
          }}
        >
          <LockOutlinedIcon sx={{ color: "#fff", fontSize: 28 }} />
        </Box>

        <Typography variant="h4" gutterBottom>
          Ibento
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary, mb: 4 }}
        >
          Sign in to access the administration interface
        </Typography>

        <Button
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
          onClick={handleLogin}
          sx={{ py: 1.5, fontSize: "1rem" }}
        >
          {loading ? "Redirecting..." : "Sign in with Casdoor"}
        </Button>
      </Card>
    </Box>
  );
};

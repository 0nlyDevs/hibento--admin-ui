import { useState } from "react";
import { useLogin } from "react-admin";
import { Box, Button, Typography } from "@mui/material";

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const login = useLogin();

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
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Dark overlay for readability */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0, 0, 0, 0.4)",
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: 420,
          width: "100%",
          mx: 2,
        }}
      >
        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <img
            src="/logo-login.svg"
            alt="Logo"
            style={{ maxWidth: 200, height: "auto" }}
          />
        </Box>

        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.8)", mb: 4, fontSize: "0.95rem" }}
        >
          Sign in to access the administration interface
        </Typography>

        <Button
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
          onClick={handleLogin}
          sx={{
            py: 1.5,
            fontSize: "1rem",
            bgcolor: "#DFDB2B",
            color: "#0f172a",
            "&:hover": {
              bgcolor: "#c9c526",
            },
          }}
        >
          {loading ? "Redirecting..." : "Sign in with Casdoor"}
        </Button>
      </Box>
    </Box>
  );
};

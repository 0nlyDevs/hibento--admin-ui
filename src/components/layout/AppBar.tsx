import { AppBar as RAAppBar } from "react-admin";
import { Box } from "@mui/material";

export const AppBar = () => (
  <RAAppBar>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        ml: 2,
      }}
    >
      <img
        src="/logo.svg"
        alt="hibento"
        style={{ height: 28, width: "auto" }}
      />
      <Box
        component="span"
        sx={{
          fontFamily: '"Sora", serif',
          fontWeight: 700,
          fontSize: "1.2rem",
          letterSpacing: "-0.02em",
          color: "#fafdf6",
        }}
      >
        Bento.
      </Box>
    </Box>
  </RAAppBar>
);

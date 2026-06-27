import { AppBar as RAAppBar } from "react-admin";
import { Box } from "@mui/material";

export const AppBar = () => (
  <RAAppBar>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        ml: 1,
      }}
    >
      <img
        src="/header-white-text.svg"
        alt="hibento"
        style={{ height: 26, width: "auto" }}
      />
    </Box>
    <Box sx={{ flex: 1 }} />
  </RAAppBar>
);

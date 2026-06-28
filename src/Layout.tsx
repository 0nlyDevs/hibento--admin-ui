import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import { GlobalStyles, Box } from "@mui/material";
import { Menu } from "./components/layout/Menu";
import { AppBar } from "./components/layout/AppBar";

const videoBg = (
  <Box
    sx={{
      position: "fixed",
      inset: 0,
      width: "100vw",
      height: "100vh",
      opacity: 0.12,
      pointerEvents: "none",
      zIndex: -1,
      overflow: "hidden",
    }}
  >
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    >
      <source src="/home-tickets.mp4" type="video/mp4" />
    </video>
  </Box>
);

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    {videoBg}
    <GlobalStyles
      styles={{
        ".RaLayout-content": {
          background: "transparent !important",
          padding: "48px 32px !important",
        },
        ".RaLayout-main": {
          background: "transparent !important",
        },
        ".MuiPaper-root[class*=RaLayout]": {
          background: "transparent !important",
        },
        ".RaDatagrid-paper": {
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          background: "rgba(34, 34, 34, 0.85) !important",
          backdropFilter: "blur(12px)",
          overflow: "hidden",
        },
        ".RaList-main": {
          marginTop: "8px",
        },
        ".MuiDrawer-root .MuiList-root": {
          paddingTop: "48px !important",
        },
        ".MuiDrawer-root .MuiDrawer-paper": {
          background: "rgba(34, 34, 34, 0.9) !important",
          borderRight: "1px solid rgba(255,255,255,0.12) !important",
          overflow: "hidden !important",
          zIndex: 10,
        },
        ".MuiDrawer-root .MuiListItemIcon-root": {
          minWidth: "40px !important",
          justifyContent: "center",
        },
        ".MuiDrawer-root .MuiListItemText-root": {
          marginLeft: "8px",
        },
        ".RaSidebar-closed .MuiListItemButton-root": {
          justifyContent: "center !important",
          paddingLeft: "8px !important",
          paddingRight: "8px !important",
        },
        ".RaSidebar-closed .MuiListItemIcon-root": {
          minWidth: "0 !important",
          justifyContent: "center",
        },
      }}
    />
    <RALayout appBar={AppBar} menu={Menu}>
      {children}
      <CheckForApplicationUpdate />
    </RALayout>
  </>
);

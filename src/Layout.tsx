import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import { GlobalStyles } from "@mui/material";
import { Menu } from "./components/layout/Menu";
import { AppBar } from "./components/layout/AppBar";

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <GlobalStyles
      styles={{
        ".RaLayout-content": {
          background: "transparent !important",
          padding: "32px 24px !important",
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
          paddingTop: "32px !important",
        },
        ".MuiDrawer-root .MuiDrawer-paper": {
          background: "rgba(34, 34, 34, 0.9) !important",
        },
      }}
    />
    <RALayout appBar={AppBar} menu={Menu}>
      {children}
      <CheckForApplicationUpdate />
    </RALayout>
  </>
);

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
        },
        "#main-content": {
          background: "transparent !important",
        },
        ".MuiPaper-root[class*=RaLayout]": {
          background: "transparent !important",
        },
      }}
    />
    <RALayout appBar={AppBar} menu={Menu}>
      {children}
      <CheckForApplicationUpdate />
    </RALayout>
  </>
);

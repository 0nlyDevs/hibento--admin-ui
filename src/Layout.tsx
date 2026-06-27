import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import { Menu } from "./components/layout/Menu";
import { AppBar } from "./components/layout/AppBar";

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <RALayout appBar={AppBar} menu={Menu}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);

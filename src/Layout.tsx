import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import { Menu } from "./components/layout/Menu";

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <RALayout menu={Menu}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);

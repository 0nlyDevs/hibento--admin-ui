import { Admin } from "react-admin";
import { Layout } from "./Layout";
import { hibentoDataProvider } from "./providers";
import { authProvider } from "./providers/authProvider";

export const App = () => (
  <Admin
    dataProvider={hibentoDataProvider}
    authProvider={authProvider}
    layout={Layout}
  />
);

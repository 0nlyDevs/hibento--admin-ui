import { Admin } from "react-admin";
import { Layout } from "./Layout";
import { hibentoDataProvider } from "./providers";

export const App = () => (
  <Admin dataProvider={hibentoDataProvider} layout={Layout} />
);

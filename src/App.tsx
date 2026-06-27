import { Admin, Resource, ListGuesser, ShowGuesser } from "react-admin";
import { Layout } from "./Layout";
import { hibentoDataProvider } from "./providers";
import { authProvider } from "./providers/authProvider";

export const App = () => (
  <Admin
    dataProvider={hibentoDataProvider}
    authProvider={authProvider}
    layout={Layout}
  >
    <Resource
      name="events"
      list={ListGuesser}
      show={ShowGuesser}
      recordRepresentation="title"
    />
    <Resource
      name="sessions"
      list={ListGuesser}
      show={ShowGuesser}
      recordRepresentation="title"
    />
    <Resource
      name="speakers"
      list={ListGuesser}
      show={ShowGuesser}
      recordRepresentation="name"
    />
    <Resource
      name="rooms"
      list={ListGuesser}
      show={ShowGuesser}
      recordRepresentation="name"
    />
    <Resource
      name="venues"
      list={ListGuesser}
      show={ShowGuesser}
      recordRepresentation="name"
    />
  </Admin>
);

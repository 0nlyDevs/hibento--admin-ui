import { Admin, Resource } from "react-admin";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme";
import { Layout } from "./Layout";
import { Dashboard } from "./dashboard/Dashboard";

/* Events */
import { EventList } from "./resources/events/EventList";
import { EventCreate } from "./resources/events/EventCreate";
import { EventEdit } from "./resources/events/EventEdit";
import { EventShow } from "./resources/events/EventShow";

/* Sessions */
import { SessionList } from "./resources/sessions/SessionList";
import { SessionCreate } from "./resources/sessions/SessionCreate";
import { SessionEdit } from "./resources/sessions/SessionEdit";
import { SessionShow } from "./resources/sessions/SessionShow";

/* Speakers */
import { SpeakerList } from "./resources/speakers/SpeakerList";
import { SpeakerCreate } from "./resources/speakers/SpeakerCreate";
import { SpeakerEdit } from "./resources/speakers/SpeakerEdit";
import { SpeakerShow } from "./resources/speakers/SpeakerShow";

/* Rooms */
import { RoomList } from "./resources/rooms/RoomList";
import { RoomCreate } from "./resources/rooms/RoomCreate";
import { RoomEdit } from "./resources/rooms/RoomEdit";
import { RoomShow } from "./resources/rooms/RoomShow";

/* Venues */
import { VenueList } from "./resources/venues/VenueList";
import { VenueCreate } from "./resources/venues/VenueCreate";
import { VenueEdit } from "./resources/venues/VenueEdit";
import { VenueShow } from "./resources/venues/VenueShow";

import EventIcon from "@mui/icons-material/Event";
import SessionIcon from "@mui/icons-material/PlayCircleOutline";
import PeopleIcon from "@mui/icons-material/People";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LocationCityIcon from "@mui/icons-material/LocationCity";
        
import { hibentoDataProvider } from "./providers";
import { authProvider } from "./providers/authProvider";

export const App = () => (
  <ThemeProvider theme={theme}>
    <Admin dashboard={Dashboard} layout={Layout} dataProvider={hibentoDataProvider}
    authProvider={authProvider} requireAuth>
      <Resource
        name="events"
        list={EventList}
        create={EventCreate}
        edit={EventEdit}
        show={EventShow}
        icon={EventIcon}
      />
      <Resource
        name="sessions"
        list={SessionList}
        create={SessionCreate}
        edit={SessionEdit}
        show={SessionShow}
        icon={SessionIcon}
      />
      <Resource
        name="speakers"
        list={SpeakerList}
        create={SpeakerCreate}
        edit={SpeakerEdit}
        show={SpeakerShow}
        icon={PeopleIcon}
      />
      <Resource
        name="rooms"
        list={RoomList}
        create={RoomCreate}
        edit={RoomEdit}
        show={RoomShow}
        icon={MeetingRoomIcon}
      />
      <Resource
        name="venues"
        list={VenueList}
        create={VenueCreate}
        edit={VenueEdit}
        show={VenueShow}
        icon={LocationCityIcon}
      />
    </Admin>
  </ThemeProvider>
);

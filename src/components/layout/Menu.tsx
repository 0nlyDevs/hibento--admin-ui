import { Menu as RAMenu } from "react-admin";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import SessionIcon from "@mui/icons-material/PlayCircleOutline";
import PeopleIcon from "@mui/icons-material/People";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LocationCityIcon from "@mui/icons-material/LocationCity";

export function Menu() {
  return (
    <RAMenu>
      <RAMenu.Item
        to="/"
        primaryText="Dashboard"
        leftIcon={<DashboardIcon />}
      />
      <RAMenu.Item to="/events" primaryText="Events" leftIcon={<EventIcon />} />
      <RAMenu.Item
        to="/sessions"
        primaryText="Sessions"
        leftIcon={<SessionIcon />}
      />
      <RAMenu.Item
        to="/speakers"
        primaryText="Speakers"
        leftIcon={<PeopleIcon />}
      />
      <RAMenu.Item
        to="/rooms"
        primaryText="Rooms"
        leftIcon={<MeetingRoomIcon />}
      />
      <RAMenu.Item
        to="/venues"
        primaryText="Venues"
        leftIcon={<LocationCityIcon />}
      />
    </RAMenu>
  );
}

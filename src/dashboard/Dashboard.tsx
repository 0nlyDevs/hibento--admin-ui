import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import SessionIcon from "@mui/icons-material/PlayCircle";
import PeopleIcon from "@mui/icons-material/People";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useGetList } from "react-admin";
import { useNavigate } from "react-router-dom";
import { StatCard } from "./StatCard";
import { PageHeader } from "../components/common/PageHeader";
import { StatusBadge } from "../components/common/StatusBadge";
import { getEventStatus } from "../utils";
import type { Event } from "../types";

export function Dashboard() {
  const navigate = useNavigate();
  const videoBg = (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(0.85)",
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

  const { total: eventTotal, isLoading: eventsLoading } = useGetList("events", {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: sessionTotal, isLoading: sessionsLoading } = useGetList(
    "sessions",
    {
      pagination: { page: 1, perPage: 1 },
    },
  );

  const { total: speakerTotal, isLoading: speakersLoading } = useGetList(
    "speakers",
    {
      pagination: { page: 1, perPage: 1 },
    },
  );

  const { total: roomTotal, isLoading: roomsLoading } = useGetList("rooms", {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: venueTotal, isLoading: venuesLoading } = useGetList("venues", {
    pagination: { page: 1, perPage: 1 },
  });

  const { data: upcomingEvents, isLoading: upcomingLoading } =
    useGetList<Event>("events", {
      pagination: { page: 1, perPage: 5 },
      sort: { field: "startDate", order: "ASC" },
    });

  const { data: recentEvents, isLoading: recentLoading } = useGetList<Event>(
    "events",
    {
      pagination: { page: 1, perPage: 5 },
      sort: { field: "createdAt", order: "DESC" },
    },
  );

  const upcoming = (upcomingEvents || []).filter(
    (e) => getEventStatus(e.startDate, e.endDate) !== "past",
  );
  const recent = (recentEvents || []).slice(0, 3);

  return (
    <Box sx={{ position: "relative" }}>
      {videoBg}
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your HIBENTO platform"
      />

      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <StatCard
            label="Total Events"
            value={eventTotal ?? 0}
            icon={<EventIcon />}
            loading={eventsLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <StatCard
            label="Total Sessions"
            value={sessionTotal ?? 0}
            icon={<SessionIcon />}
            loading={sessionsLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <StatCard
            label="Total Speakers"
            value={speakerTotal ?? 0}
            icon={<PeopleIcon />}
            loading={speakersLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <StatCard
            label="Total Rooms"
            value={roomTotal ?? 0}
            icon={<MeetingRoomIcon />}
            loading={roomsLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <StatCard
            label="Total Venues"
            value={venueTotal ?? 0}
            icon={<LocationCityIcon />}
            loading={venuesLoading}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>
                Upcoming Events
              </Typography>
              {upcomingLoading ? (
                <Typography variant="body2" color="text.secondary">
                  Loading...
                </Typography>
              ) : upcoming.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No upcoming events
                </Typography>
              ) : (
                <Box>
                  {upcoming.map((event) => (
                    <Box
                      key={event.id}
                      onClick={() => navigate(`/events/${event.id}/show`)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: 1.5,
                        px: 1.5,
                        borderRadius: 1,
                        cursor: "pointer",
                        transition: "background-color 0.15s",
                        "&:hover": { backgroundColor: "action.hover" },
                        "&:not(:last-child)": {
                          borderBottom: "1px solid",
                          borderColor: "divider",
                        },
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {event.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(event.startDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </Typography>
                      </Box>
                      <StatusBadge
                        status={getEventStatus(event.startDate, event.endDate)}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>
                Recently Created
              </Typography>
              {recentLoading ? (
                <Typography variant="body2" color="text.secondary">
                  Loading...
                </Typography>
              ) : recent.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No events yet
                </Typography>
              ) : (
                <Box>
                  {recent.map((event) => (
                    <Box
                      key={event.id}
                      onClick={() => navigate(`/events/${event.id}/show`)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: 1.5,
                        px: 1.5,
                        borderRadius: 1,
                        cursor: "pointer",
                        transition: "background-color 0.15s",
                        "&:hover": { backgroundColor: "action.hover" },
                        "&:not(:last-child)": {
                          borderBottom: "1px solid",
                          borderColor: "divider",
                        },
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {event.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Created{" "}
                          {new Date(event.createdAt || "").toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {getEventStatus(event.startDate, event.endDate) ===
                        "live" ? (
                          <StatusBadge status="live" />
                        ) : (
                          <StatusBadge
                            status={getEventStatus(
                              event.startDate,
                              event.endDate,
                            )}
                          />
                        )}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

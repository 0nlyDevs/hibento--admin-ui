import {
  List,
  CreateButton,
  useListContext,
  type ListProps,
} from "react-admin";
import { Box, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EventCard } from "../../components/events/EventCard";
import { SearchBar } from "../../components/common/SearchBar";
import type { Event } from "../../types";

function EventGrid() {
  const { data, isLoading, total } = useListContext<Event>();
  const navigate = useNavigate();

  if (isLoading) return null;

  return (
    <Box sx={{ p: 2 }}>
      <Card
        sx={{
          p: "20px 24px",
          mb: 3,
          background: "rgba(255, 255, 255, 0.05)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              Events
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {total} event{total !== 1 ? "s" : ""}
            </Typography>
          </Box>
          <CreateButton
            sx={{
              backgroundColor: "primary.main",
              color: "secondary.main",
              fontWeight: 600,
              borderRadius: "8px",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          />
        </Box>
        <SearchBar placeholder="Search events..." />
      </Card>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr", lg: "1fr 1fr 1fr 1fr" },
          gap: "20px",
        }}
      >
        {data?.map((record) => (
          <EventCard
            key={record.id}
            event={record}
            onClick={() => navigate(`/events/${record.id}/show`)}
          />
        ))}
      </Box>
    </Box>
  );
}

export function EventList(props: ListProps) {
  return (
    <List
      {...props}
      sort={{ field: "startDate", order: "DESC" }}
      actions={false}
      component="div"
    >
      <EventGrid />
    </List>
  );
}

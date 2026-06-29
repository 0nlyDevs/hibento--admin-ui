import {
  List,
  CreateButton,
  useListContext,
  type ListProps,
} from "react-admin";
import { Box, Grid, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { VenueCard } from "../../components/venues/VenueCard";
import { SearchBar } from "../../components/common/SearchBar";
import type { Venue } from "../../types";

function VenueGrid() {
  const { data, isLoading, total } = useListContext<Venue>();
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
            <Typography
              variant="h5"
              fontWeight={700}
              color="#FAFDF6"
            >
              Venues
            </Typography>
            <Typography
              variant="body2"
              color="#A9A7B0"
            >
              {total} venue{total !== 1 ? "s" : ""}
            </Typography>
          </Box>
          <CreateButton
            sx={{
              backgroundColor: "#DDD92A",
              color: "#2D2A32",
              fontWeight: 600,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#C4C026",
              },
            }}
          />
        </Box>
        <SearchBar placeholder="Search venues..." />
      </Card>
      <Grid container spacing={2.5}>
        {data?.map((record) => (
          <Grid key={record.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <VenueCard
              venue={record}
              onClick={() => navigate(`/venues/${record.id}/show`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export function VenueList(props: ListProps) {
  return (
    <List
      {...props}
      sort={{ field: "name", order: "ASC" }}
      actions={false}
      component="div"
    >
      <VenueGrid />
    </List>
  );
}

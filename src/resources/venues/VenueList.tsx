import {
  List,
  SearchInput,
  TextInput,
  TopToolbar,
  CreateButton,
  useListContext,
  type ListProps,
} from "react-admin";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { VenueCard } from "../../components/venues/VenueCard";
import type { Venue } from "../../types";

const venueFilters = [
  <SearchInput source="q" alwaysOn key="search" />,
  <TextInput source="name" label="Name" key="name" />,
  <TextInput source="city" label="City" key="city" />,
];

function VenueGrid() {
  const { data, isLoading, total } = useListContext<Venue>();
  const navigate = useNavigate();

  if (isLoading) return null;

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          pb: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Venues
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {total} venue{total !== 1 ? "s" : ""}
          </Typography>
        </Box>
      </Box>
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
      filters={venueFilters}
      sort={{ field: "name", order: "ASC" }}
      actions={
        <TopToolbar>
          <CreateButton />
        </TopToolbar>
      }
      component="div"
    >
      <VenueGrid />
    </List>
  );
}

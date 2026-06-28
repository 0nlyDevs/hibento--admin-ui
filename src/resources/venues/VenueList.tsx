import {
  List,
  CreateButton,
  useListContext,
  type ListProps,
} from "react-admin";
import { Box, Grid, Typography, InputAdornment, TextField } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { VenueCard } from "../../components/venues/VenueCard";
import type { Venue } from "../../types";

function VenueGrid() {
  const { data, isLoading, total, filterValues, setFilters } =
    useListContext<Venue>();
  const navigate = useNavigate();

  if (isLoading) return null;

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          backgroundColor: "#2D2A32",
          borderRadius: "12px",
          p: "20px 24px",
          mb: 3,
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
        <TextField
          value={filterValues?.q || ""}
          onChange={(e) => setFilters({ q: e.target.value }, undefined, false)}
          placeholder="Search venues..."
          variant="outlined"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#6B6973" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#38353E",
              borderRadius: "8px",
              color: "#FAFDF6",
              fontSize: "0.9rem",
              "& fieldset": {
                borderColor: "#413E48",
              },
              "&:hover fieldset": {
                borderColor: "#6B6973",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#DDD92A",
                borderWidth: "2px",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#6B6973",
              opacity: 1,
            },
          }}
        />
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
      sort={{ field: "name", order: "ASC" }}
      actions={false}
      component="div"
    >
      <VenueGrid />
    </List>
  );
}

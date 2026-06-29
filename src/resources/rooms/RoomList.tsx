import {
  List,
  CreateButton,
  useListContext,
  type ListProps,
} from "react-admin";
import { Box, Typography, InputAdornment, TextField, Card, IconButton } from "@mui/material";
import Search from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { RoomCard } from "../../components/rooms/RoomCard";
import type { Room } from "../../types";

function RoomGrid() {
  const { data, isLoading, total, filterValues, setFilters } =
    useListContext<Room>();
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
            <Typography variant="h5" fontWeight={700} color="#FAFDF6">
              Rooms
            </Typography>
            <Typography variant="body2" color="#A9A7B0">
              {total} room{total !== 1 ? "s" : ""}
            </Typography>
          </Box>
          <CreateButton
            sx={{
              backgroundColor: "#DDD92A",
              color: "#2D2A32",
              fontWeight: 600,
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#C4C026" },
            }}
          />
        </Box>
        <TextField
          value={filterValues?.q || ""}
          onChange={(e) => setFilters({ q: e.target.value }, undefined, 300)}
          placeholder="Search rooms..."
          variant="outlined"
          fullWidth
          slotProps={{
            input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: "#6B6973" }} />
            </InputAdornment>
          ),
          endAdornment: filterValues?.q ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setFilters({}, undefined, 300)}>
                <Close sx={{ color: "#6B6973", fontSize: 18 }} />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              borderRadius: "8px",
              color: "#FAFDF6",
              fontSize: "0.9rem",
              "& fieldset": { borderColor: "#413E48" },
              "&:hover fieldset": { borderColor: "#6B6973" },
              "&.Mui-focused fieldset": { borderColor: "#DDD92A", borderWidth: "2px" },
            },
            "& .MuiInputBase-input::placeholder": { color: "#6B6973", opacity: 1 },
          }}
        />
      </Card>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr", lg: "1fr 1fr 1fr 1fr" },
          gap: "20px",
        }}
      >
        {data?.map((record) => (
          <RoomCard
            key={record.id}
            room={record}
            onClick={() => navigate(`/rooms/${record.id}/show`)}
          />
        ))}
      </Box>
    </Box>
  );
}

export function RoomList(props: ListProps) {
  return (
    <List
      {...props}
      sort={{ field: "name", order: "ASC" }}
      actions={false}
      component="div"
    >
      <RoomGrid />
    </List>
  );
}

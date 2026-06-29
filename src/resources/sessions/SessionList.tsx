import {
  List,
  CreateButton,
  useListContext,
  type ListProps,
} from "react-admin";
import { Box, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SessionCard } from "../../components/sessions/SessionCard";
import { SearchBar } from "../../components/common/SearchBar";
import type { Session } from "../../types";

function SessionGrid() {
  const { data, isLoading, total } = useListContext<Session>();
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
              Sessions
            </Typography>
            <Typography variant="body2" color="#A9A7B0">
              {total} session{total !== 1 ? "s" : ""}
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
        <SearchBar placeholder="Search sessions..." />
      </Card>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr", lg: "1fr 1fr 1fr 1fr" },
          gap: "20px",
        }}
      >
        {data?.map((record) => (
          <SessionCard
            key={record.id}
            session={record}
            onClick={() => navigate(`/sessions/${record.id}/show`)}
          />
        ))}
      </Box>
    </Box>
  );
}

export function SessionList(props: ListProps) {
  return (
    <List
      {...props}
      sort={{ field: "startTime", order: "DESC" }}
      actions={false}
      component="div"
    >
      <SessionGrid />
    </List>
  );
}

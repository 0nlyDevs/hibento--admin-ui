import { Card, CardContent, Typography, Box, Skeleton } from "@mui/material";
import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  loading?: boolean;
}

export function StatCard({ label, value, icon, loading }: StatCardProps) {
  return (
    <Card
      sx={{
        transition: "box-shadow 0.2s, transform 0.2s",
        "&:hover": {
          boxShadow: "0 4px 12px 0 rgb(0 0 0 / 0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={500}
              mb={0.5}
            >
              {label}
            </Typography>
            {loading ? (
              <Skeleton width={60} height={36} />
            ) : (
              <Typography variant="h4" fontWeight={700} color="text.primary">
                {value}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

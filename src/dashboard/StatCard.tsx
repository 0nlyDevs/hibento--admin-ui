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
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&:hover": {
          boxShadow: "0 8px 32px rgba(221, 217, 42, 0.15)",
          transform: "translateY(-4px)",
          borderColor: "rgba(221, 217, 42, 0.3)",
        },
      }}
    >
      <CardContent>
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

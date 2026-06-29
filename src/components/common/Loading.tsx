import { Box } from "@mui/material";

interface LoadingProps {
  size?: number;
}

export function Loading({ size = 32 }: LoadingProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        width: "100%",
        py: 8,
      }}
    >
      <Box
        sx={{
          width: size,
          height: size,
          border: "2px solid rgba(250, 253, 246, 0.2)",
          borderTopColor: "primary.main",
          borderRadius: "50%",
          animation: "hibento-spin 0.8s linear infinite",
          "@keyframes hibento-spin": {
            to: { transform: "rotate(360deg)" },
          },
        }}
      />
    </Box>
  );
}

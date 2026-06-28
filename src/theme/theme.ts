import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0f172a",
      light: "#1e293b",
      dark: "#020617",
    },
    secondary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
    divider: "#e2e8f0",
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.1rem",
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "0.95rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
    caption: {
      fontSize: "0.75rem",
      color: "#64748b",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
          border: "1px solid #e2e8f0",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 8,
          padding: "8px 16px",
        },
        containedPrimary: {
          backgroundColor: "#0f172a",
          "&:hover": {
            backgroundColor: "#1e293b",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "#64748b",
          backgroundColor: "#f8fafc",
        },
        root: {
          padding: "12px 16px",
          borderBottomColor: "#f1f5f9",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#f8fafc",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: "0.75rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.08)",
          borderBottom: "1px solid #e2e8f0",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #e2e8f0",
        },
      },
    },
  },
});
